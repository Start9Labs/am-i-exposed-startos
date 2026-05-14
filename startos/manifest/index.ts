import { setupManifest } from '@start9labs/start-sdk'
import { long, mempoolDescription, short, torDescription } from './i18n'

export const manifest = setupManifest({
  id: 'am-i-exposed',
  title: 'Am I Exposed?',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9Labs/am-i-exposed-startos',
  upstreamRepo: 'https://github.com/Copexit/am-i-exposed',
  marketingUrl: 'https://am-i.exposed',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    main: {
      source: {
        dockerTag: 'ghcr.io/copexit/am-i-exposed-umbrel:v0.35.7',
      },
      arch: ['x86_64', 'aarch64'],
    },
    'tor-proxy': {
      source: {
        dockerBuild: {
          workdir: './tor-proxy',
        },
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
        icon: 'https://raw.githubusercontent.com/Start9Labs/mempool-startos/58ef0d5b4f29577baa65da7a4a4987621d88c0e7/icon.svg',
      },
    },
    tor: {
      description: torDescription,
      optional: false,
      metadata: {
        title: 'Tor',
        icon: 'https://raw.githubusercontent.com/Start9Labs/tor-startos/65faea17febc739d910e8c26ff4e61f6333487a8/icon.svg',
      },
    },
  },
})
