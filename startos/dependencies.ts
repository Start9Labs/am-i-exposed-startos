import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(
  async ({ effects }) => ({
    mempool: {
      kind: 'running',
      versionRange: '>=3.2.1:8-beta.1',
      healthChecks: ['webui'],
    },
  }),
)
