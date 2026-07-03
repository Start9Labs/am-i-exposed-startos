import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => ({
  mempool: {
    kind: 'running',
    versionRange: '>=3.3.1:15',
    healthChecks: ['webui'],
  },
  tor: {
    kind: 'running',
    versionRange: '>=0.4.9.11:2',
    healthChecks: ['tor'],
  },
}))
