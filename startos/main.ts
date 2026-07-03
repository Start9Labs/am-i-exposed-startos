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

  // The app queries Mempool over the LXC bridge (APP_MEMPOOL_IP), and links out
  // to it via a public-facing URL — a public domain, then a public IP, then the
  // mDNS .local address (empty string is a no-op upstream). Both come from
  // Mempool's `webui` host; am-i-exposed has no compile-time handle on Mempool's
  // host ids, so resolve the host id once from the interface, then subscribe so
  // the addresses re-fire when they change.
  const webuiHostId = (
    await effects.getServiceInterface({
      packageId: 'mempool',
      serviceInterfaceId: 'webui',
    })
  )?.addressInfo?.hostId
  const mempool = webuiHostId
    ? await sdk.host
        .get(effects, { hostId: webuiHostId, packageId: 'mempool' }, (host) => {
          const addr =
            host &&
            Object.values(host.bindings)
              .flatMap((b) => Object.values(b.interfaces))
              .find((i) => i.id === 'webui')?.addressInfo
          if (!addr) return null
          const h = addr.filter({
            kind: 'bridge',
            predicate: (h) => h.metadata.kind === 'ipv4' && !h.ssl,
          }).hostnames[0]
          return {
            bridge:
              h && h.port != null ? { ip: h.hostname, port: h.port } : undefined,
            externalUrl:
              addr
                .filter({ visibility: 'public', kind: 'domain' })
                .format()[0] ??
              addr
                .filter({ visibility: 'public', kind: 'ip' })
                .format()[0] ??
              addr.filter({ kind: 'mdns' }).format()[0] ??
              '',
          }
        })
        .const()
    : null
  if (!mempool?.bridge) {
    throw new Error('Waiting for Mempool to be reachable')
  }

  // tor's SOCKS proxy is not a StartOS binding — reach it via tor's container IP.
  const torIp = await sdk.getContainerIp(effects, { packageId: 'tor' }).const()

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
          TOR_PROXY_IP: torIp,
          TOR_PROXY_PORT: '9050',
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
          APP_MEMPOOL_IP: mempool.bridge.ip,
          APP_MEMPOOL_PORT: String(mempool.bridge.port),
          APP_TOR_PROXY_IP: '127.0.0.1',
          APP_TOR_PROXY_PORT: String(torProxyPort),
          APP_MEMPOOL_HIDDEN_SERVICE: '',
          APP_MEMPOOL_EXTERNAL_URL: mempool.externalUrl,
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
