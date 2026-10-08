import { mempoolDescription, torDescription } from './manifest/i18n'
import { sdk } from './sdk'

export const dependencies = sdk.Dependencies.of()
  .addDependency(
    sdk.Dependency.required('mempool', {
      description: mempoolDescription,
      metadata: {
        title: 'Mempool',
        icon: 'https://raw.githubusercontent.com/Start9Labs/mempool-startos/58ef0d5b4f29577baa65da7a4a4987621d88c0e7/icon.svg',
      },
      versionRange: '>=3.3.1:18',
      kind: 'running',
      healthChecks: ['webui'],
    }),
  )
  .addDependency(
    sdk.Dependency.required('tor', {
      description: torDescription,
      metadata: {
        title: 'Tor',
        icon: 'https://raw.githubusercontent.com/Start9Labs/tor-startos/65faea17febc739d910e8c26ff4e61f6333487a8/icon.svg',
      },
      versionRange: '>=0.4.9.11:4',
      kind: 'running',
      healthChecks: ['tor'],
    }),
  )
