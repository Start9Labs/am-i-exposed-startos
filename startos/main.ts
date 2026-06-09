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

  // Fix for https://github.com/Copexit/am-i-exposed/issues/95 - the "View on
  // local mempool" link in the upstream UI is built from APP_MEMPOOL_PORT
  // assuming the app and mempool share a hostname (Umbrel layout). On StartOS
  // each service has its own hostname, so the host:port heuristic produces a
  // link to `<this-app-host>:8080`, which is not mempool. Upstream now
  // accepts an optional APP_MEMPOOL_EXTERNAL_URL env var that overrides the
  // heuristic; resolve mempool's actual user-facing webui URL via the SDK
  // and pass it in. Empty string is a no-op upstream.
  const mempoolUi = await sdk.serviceInterface
    .get(effects, { packageId: 'mempool', interfaceId: 'webui' })
    .const()
  const mempoolExternalUrl =
    mempoolUi?.addressInfo?.nonLocal?.format()[0] ?? ''

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
