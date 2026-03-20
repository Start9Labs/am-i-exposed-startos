import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Am I Exposed?'))

  return sdk.Daemons.of(effects).addDaemon('primary', {
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
        // Dummy values - tor proxy is not used on StartOS
        APP_TOR_PROXY_IP: '127.0.0.1',
        APP_TOR_PROXY_PORT: '1',
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
    requires: [],
  })
})
