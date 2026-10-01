import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.37.5:0',
  releaseNotes: {
    en_US: `Updated Am I Exposed? to 0.37.5. Fixes untranslated probability labels and the partial-result note in Link Probability Matrix tooltips.

[Full upstream changes](https://github.com/Copexit/am-i-exposed/compare/v0.37.4...v0.37.5)`,
    es_ES: `Am I Exposed? se actualizó a 0.37.5. Corrige las etiquetas de probabilidad y la nota de resultado parcial que aparecían sin traducir en la información emergente de la matriz de probabilidad de vínculos.

[Cambios completos del proyecto original](https://github.com/Copexit/am-i-exposed/compare/v0.37.4...v0.37.5)`,
    de_DE: `Am I Exposed? wurde auf 0.37.5 aktualisiert. Behebt unübersetzte Wahrscheinlichkeitsbezeichnungen und den Hinweis auf Teilergebnisse in den Tooltips der Verknüpfungswahrscheinlichkeitsmatrix.

[Alle Änderungen des Ursprungsprojekts](https://github.com/Copexit/am-i-exposed/compare/v0.37.4...v0.37.5)`,
    pl_PL: `Zaktualizowano Am I Exposed? do wersji 0.37.5. Poprawiono nieprzetłumaczone etykiety prawdopodobieństwa i uwagę o wyniku częściowym w podpowiedziach macierzy prawdopodobieństwa powiązań.

[Pełna lista zmian projektu](https://github.com/Copexit/am-i-exposed/compare/v0.37.4...v0.37.5)`,
    fr_FR: `Am I Exposed? a été mis à jour vers la version 0.37.5. Corrige les libellés de probabilité et la note de résultat partiel non traduits dans les infobulles de la matrice de probabilité des liens.

[Toutes les modifications du projet d'origine](https://github.com/Copexit/am-i-exposed/compare/v0.37.4...v0.37.5)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
