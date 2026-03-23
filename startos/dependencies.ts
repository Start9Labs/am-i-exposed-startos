import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => ({
  mempool: {
    kind: 'running',
    versionRange: '>=3.2.1:8-beta.2',
    healthChecks: ['webui'],
  },
  tor: {
    kind: 'running',
    versionRange: '>=0.4.9.5:0-beta.4',
    healthChecks: ['tor'],
  },
}))
