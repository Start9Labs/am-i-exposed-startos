import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.42.2:0',
  releaseNotes: {
    en_US: `Updated Am I Exposed? to 0.42.2. Wallet analysis and coin selection distinguish identifiable change from ambiguous change, and wallet audits show the active network. Observatory tabs and labeling/spending guides have dedicated pages. Updated start-sdk to 3.0.6.

[Full upstream changes](https://github.com/Copexit/am-i-exposed/compare/v0.42.1...v0.42.2)`,
    es_ES: `Am I Exposed? se actualizó a 0.42.2. El análisis de carteras y la selección de monedas distinguen el cambio identificable del ambiguo, y las auditorías muestran la red activa. Las pestañas del Observatorio y las guías de etiquetado y gasto tienen páginas propias. Se actualizó start-sdk a 3.0.6.

[Cambios completos del proyecto original](https://github.com/Copexit/am-i-exposed/compare/v0.42.1...v0.42.2)`,
    de_DE: `Am I Exposed? wurde auf 0.42.2 aktualisiert. Wallet-Analyse und Coin-Auswahl unterscheiden erkennbares von mehrdeutigem Wechselgeld, und Wallet-Prüfungen zeigen das aktive Netzwerk an. Observatorium-Tabs sowie Anleitungen zum Kennzeichnen und Ausgeben haben eigene Seiten. start-sdk wurde auf 3.0.6 aktualisiert.

[Alle Änderungen des Ursprungsprojekts](https://github.com/Copexit/am-i-exposed/compare/v0.42.1...v0.42.2)`,
    pl_PL: `Zaktualizowano Am I Exposed? do wersji 0.42.2. Analiza portfeli i dobór monet rozróżniają rozpoznawalną i niejednoznaczną resztę, a audyty portfeli pokazują aktywną sieć. Karty Obserwatorium oraz poradniki etykietowania i wydawania mają osobne strony. Zaktualizowano start-sdk do wersji 3.0.6.

[Pełna lista zmian projektu](https://github.com/Copexit/am-i-exposed/compare/v0.42.1...v0.42.2)`,
    fr_FR: `Am I Exposed? a été mis à jour vers la version 0.42.2. L'analyse des portefeuilles et la sélection des pièces distinguent la monnaie rendue identifiable de celle qui est ambiguë, et les audits affichent le réseau actif. Les onglets de l'Observatoire et les guides d'étiquetage et de dépense ont leurs propres pages. start-sdk a été mis à jour vers la version 3.0.6.

[Toutes les modifications du projet d'origine](https://github.com/Copexit/am-i-exposed/compare/v0.42.1...v0.42.2)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
