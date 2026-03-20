import { setupManifest } from '@start9labs/start-sdk'
import { long, mempoolDescription, short } from './i18n'

export const manifest = setupManifest({
  id: 'am-i-exposed',
  title: 'Am I Exposed?',
  license: 'MIT',
  packageRepo:
    'https://github.com/Start9Labs/am-i-exposed-startos/tree/update/040',
  upstreamRepo: 'https://github.com/Copexit/am-i-exposed',
  marketingUrl: 'https://am-i.exposed',
  donationUrl: null,
  docsUrls: ['https://github.com/Copexit/am-i-exposed/tree/main/docs'],
  description: { short, long },
  volumes: ['main'],
  images: {
    main: {
      source: {
        dockerTag: 'ghcr.io/copexit/am-i-exposed-umbrel:v0.10.0',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {
    mempool: {
      description: mempoolDescription,
      optional: false,
      metadata: {
        title: 'Mempool',
        icon: 'https://raw.githubusercontent.com/Start9Labs/mempool-startos/refs/heads/update/040/icon.svg',
      },
    },
  },
})
