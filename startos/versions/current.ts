import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.43.2:3',
  releaseNotes: {
    en_US: 'Includes the November 2026 Node.js security fixes.',
    es_ES:
      'Incluye las correcciones de seguridad de Node.js de noviembre de 2026.',
    de_DE: 'Enthält die Node.js-Sicherheitskorrekturen vom November 2026.',
    pl_PL: 'Zawiera poprawki bezpieczeństwa Node.js z listopada 2026.',
    fr_FR: 'Inclut les correctifs de sécurité Node.js de novembre 2026.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
