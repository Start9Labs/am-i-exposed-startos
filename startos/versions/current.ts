import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.37.4:0',
  releaseNotes: {
    en_US: `Updated Am I Exposed? to 0.37.4.

[Full upstream changes](https://github.com/Copexit/am-i-exposed/compare/v0.37.2...v0.37.4)`,
    es_ES: `Am I Exposed? se actualizó a 0.37.4.

[Cambios completos del proyecto original](https://github.com/Copexit/am-i-exposed/compare/v0.37.2...v0.37.4)`,
    de_DE: `Am I Exposed? wurde auf 0.37.4 aktualisiert.

[Alle Änderungen des Ursprungsprojekts](https://github.com/Copexit/am-i-exposed/compare/v0.37.2...v0.37.4)`,
    pl_PL: `Zaktualizowano Am I Exposed? do wersji 0.37.4.

[Pełna lista zmian projektu](https://github.com/Copexit/am-i-exposed/compare/v0.37.2...v0.37.4)`,
    fr_FR: `Am I Exposed? a été mis à jour vers la version 0.37.4.

[Toutes les modifications du projet d'origine](https://github.com/Copexit/am-i-exposed/compare/v0.37.2...v0.37.4)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
