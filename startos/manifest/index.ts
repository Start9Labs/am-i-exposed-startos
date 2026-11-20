import { setupManifest } from '@start9labs/start-sdk'
import { upstreamVersion } from '../utils'
import { long, short } from './i18n'

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
        dockerTag: `ghcr.io/copexit/am-i-exposed-umbrel:v${upstreamVersion}`,
      },
      arch: ['x86_64', 'aarch64'],
    },
    'tor-proxy': {
      source: {
        dockerTag: `ghcr.io/copexit/am-i-exposed-tor-proxy:v${upstreamVersion}`,
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
