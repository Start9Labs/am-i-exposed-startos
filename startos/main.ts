import { i18n } from './i18n'
import { sdk } from './sdk'
import { torProxyPort, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Am I Exposed?'))

  // The backend connects to mempool.startos:8080 once at startup and never
  // reconnects on its own — when Mempool restarts (e.g. on update) its web UI
  // bounces and the app gets stuck showing "Mempool Unreachable" until it is
  // manually restarted. Reading Mempool's health here subscribes main to it:
  // while webui is down this throws and holds the daemons, and main re-runs —
  // restarting primary, which reconnects — as soon as Mempool is healthy again.
  const deps = await sdk.checkDependencies(effects, ['mempool'])
  deps.throwIfHealthNotSatisfied('mempool', 'webui')

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
