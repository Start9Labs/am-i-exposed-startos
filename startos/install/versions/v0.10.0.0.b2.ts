import { VersionInfo } from '@start9labs/start-sdk'

export const v_0_10_0_0_b2 = VersionInfo.of({
  version: '0.10.0:0-beta.2',
  releaseNotes: {
    en_US: 'Initial release for StartOS',
    es_ES: 'Versión inicial para StartOS',
    de_DE: 'Erstveröffentlichung für StartOS',
    pl_PL: 'Pierwsza wersja dla StartOS',
    fr_FR: 'Première version pour StartOS',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
