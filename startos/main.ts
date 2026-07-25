import {
  mainHostId as mempoolHostId,
  uiPort as mempoolUiPort,
} from 'mempool-startos/startos/utils'
import { socksHostId, socksPort } from 'tor-startos/startos/utils'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { torProxyPort, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Am I Exposed?'))

  // The backend connects to Mempool once at startup and never reconnects on its
  // own — when Mempool restarts (e.g. on update) its web UI bounces and the app
  // gets stuck on "Mempool Unreachable" until manually restarted.
  // getStatus(effects, ...).const() subscribes main to Mempool's status,
  // re-running it on every restart/stop/health change; throwing while Mempool's
  // webui health isn't success holds the daemons and restarts primary —
  // reconnecting it — as soon as Mempool is reachable again. (Mempool's webui
  // requires its api, so webui success implies the backend is up too.)
  // checkDependencies can't do this: it's a one-shot read with no reactive
  // callback, so main would never re-run when Mempool's status changed.
  const mempoolStatus = await sdk
    .getStatus(effects, { packageId: 'mempool' })
    .const()
  if (mempoolStatus?.health['webui']?.result !== 'success') {
    throw new Error('Waiting for Mempool to be reachable')
  }

  // The app proxies its `/api` calls to Mempool's webui over the LXC bridge
  // (APP_MEMPOOL_IP/APP_MEMPOOL_PORT). A doctrine-v3 `.const()` on just the
  // bridge address: a Mempool update is 0 restarts, install/uninstall/port
  // change is one healing restart. The status gate above already blocks until
  // the binding exists, so this only heals on a later port change.
  const mempoolBridge = await sdk.host
    .getBridgeAddress(effects, {
      packageId: 'mempool',
      hostId: mempoolHostId,
      internalPort: mempoolUiPort,
      ssl: false,
    })
    .const()
  if (!mempoolBridge) {
    throw new Error('Waiting for Mempool to be reachable')
  }
  const [mempoolIp, mempoolPort] = mempoolBridge.split(':')

  // The upstream UI also links out to Mempool via a public-facing URL
  // (APP_MEMPOOL_EXTERNAL_URL) — a public domain, then a public IP, then the
  // mDNS .local address (empty string is a no-op upstream). A separate
  // `.const()` on the same host, mapped to just that URL, so it fires only when
  // the browser-facing address changes (a rare, user-driven event), never on a
  // Mempool update.
  const mempoolExternalUrl = await sdk.host
    .get(effects, { hostId: mempoolHostId, packageId: 'mempool' }, (host) => {
      const addr =
        host &&
        Object.values(host.bindings)
          .flatMap((b) => Object.values(b.interfaces))
          .find((i) => i.id === 'webui')?.addressInfo
      if (!addr) return ''
      return (
        addr.filter({ visibility: 'public', kind: 'domain' }).format()[0] ??
        addr.filter({ visibility: 'public', kind: 'ip' }).format()[0] ??
        addr.filter({ kind: 'mdns' }).format()[0] ??
        ''
      )
    })
    .const()

  // Tor's SOCKS proxy over the bridge, handed to the tor-proxy sidecar as
  // TOR_SOCKS. With the 9050 fallback the mapped value stays constant across
  // tor install/update/uninstall, so this `.const()` never restarts on tor
  // churn; a dead bridge address is just connection-refused, so routing
  // Chainalysis lookups through it is always safe.
  const torSocks = await sdk.host
    .getBridgeAddress(effects, {
      packageId: 'tor',
      hostId: socksHostId,
      internalPort: socksPort,
      fallbackPort: socksPort,
    })
    .const()

  return sdk.Daemons.of(effects)
    .addDaemon('tor-proxy', {
      subcontainer: sdk.SubContainer.of(
        effects,
        { imageId: 'tor-proxy' },
        sdk.Mounts.of(),
        'tor-proxy',
      ),
      exec: {
        command: sdk.useEntrypoint(),
        env: {
          PORT: String(torProxyPort),
          TOR_SOCKS: torSocks,
        },
      },
      ready: {
        display: null,
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, torProxyPort, {
            successMessage: i18n('Tor proxy is ready'),
            errorMessage: i18n('Waiting for Tor proxy to be ready'),
          }),
      },
      requires: [],
    })
    .addDaemon('primary', {
      subcontainer: sdk.SubContainer.of(
        effects,
        { imageId: 'main' },
        sdk.Mounts.of().mountVolume({
          volumeId: 'main',
          subpath: null,
          mountpoint: '/data',
          readonly: false,
        }),
        'main',
      ),
      exec: {
        command: sdk.useEntrypoint(),
        env: {
          APP_MEMPOOL_IP: mempoolIp,
          APP_MEMPOOL_PORT: mempoolPort,
          APP_TOR_PROXY_IP: '127.0.0.1',
          APP_TOR_PROXY_PORT: String(torProxyPort),
          APP_MEMPOOL_HIDDEN_SERVICE: '',
          APP_MEMPOOL_EXTERNAL_URL: mempoolExternalUrl,
        },
      },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          }),
      },
      requires: ['tor-proxy'],
    })
})
