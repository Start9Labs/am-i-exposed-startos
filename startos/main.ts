import { i18n } from './i18n'
import { sdk } from './sdk'
import { torProxyPort, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Am I Exposed?'))

  // The backend connects to mempool.startos:8080 once at startup and never
  // reconnects on its own — when Mempool restarts (e.g. on update) its web UI
  // bounces and the app gets stuck on "Mempool Unreachable" until manually
  // restarted. getStatus(effects, ...).const() subscribes main to Mempool's
  // status, re-running it on every restart/stop/health change; throwing while
  // Mempool's webui health isn't success holds the daemons and restarts
  // primary — reconnecting it — as soon as Mempool is reachable again.
  // (Mempool's webui requires its api, so webui success implies the backend
  // is up too.) checkDependencies can't do this: it's a one-shot read with no
  // reactive callback, so main would never re-run when Mempool's status changed.
  const mempoolStatus = await sdk
    .getStatus(effects, { packageId: 'mempool' })
    .const()
  if (mempoolStatus?.health['webui']?.result !== 'success') {
    throw new Error('Waiting for Mempool to be reachable')
  }
  // Prefer a public domain, then a public IP:port, then the mDNS
  // .local address; empty string is a no-op upstream.
  const mempoolAddress = (
    await sdk.serviceInterface
      .get(effects, { packageId: 'mempool', id: 'webui' })
      .const()
  )?.addressInfo
  const APP_MEMPOOL_EXTERNAL_URL =
    mempoolAddress
      ?.filter({ visibility: 'public', kind: 'domain' })
      .format()[0] ??
    mempoolAddress?.filter({ visibility: 'public', kind: 'ip' }).format()[0] ??
    mempoolAddress?.filter({ kind: 'mdns' }).format()[0] ??
    ''

  return sdk.Daemons.of(effects)
    .addDaemon('tor-proxy', {
      subcontainer: await sdk.SubContainer.of(
        effects,
        { imageId: 'tor-proxy' },
        sdk.Mounts.of(),
        'tor-proxy',
      ),
      exec: {
        command: sdk.useEntrypoint(),
        env: {
          PORT: String(torProxyPort),
          TOR_PROXY_IP: 'tor.startos',
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
      subcontainer: await sdk.SubContainer.of(
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
          APP_MEMPOOL_IP: 'mempool.startos',
          APP_MEMPOOL_PORT: '8080',
          APP_TOR_PROXY_IP: '127.0.0.1',
          APP_TOR_PROXY_PORT: String(torProxyPort),
          APP_MEMPOOL_HIDDEN_SERVICE: '',
          APP_MEMPOOL_EXTERNAL_URL,
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
