import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.37.4:0',
  releaseNotes: {
    en_US: `Updated Am I Exposed? to 0.37.4. A redesigned scanner with light mode, transaction-flow views and a graph explorer replaces the classic interface. Analysis improves WabiSabi detection and scoring of single-input transactions, address reuse and chain patterns. Testnet3 support ends; saved testnet3 selections return to mainnet. The Observatory splits Whirlpool and WabiSabi into separate tabs and lists recent WabiSabi rounds.

[Full upstream changes](https://github.com/Copexit/am-i-exposed/compare/v0.36.0...v0.37.4)`,
    es_ES: `Am I Exposed? se actualizó a 0.37.4. Una interfaz rediseñada con modo claro, vistas del flujo de transacciones y un explorador de grafos sustituye a la interfaz clásica. El análisis mejora la detección de WabiSabi y la puntuación de las transacciones con una sola entrada, la reutilización de direcciones y los patrones de la cadena. Se retira la compatibilidad con testnet3; las selecciones guardadas de testnet3 vuelven a la red principal. El Observatorio separa Whirlpool y WabiSabi en pestañas distintas y muestra las rondas recientes de WabiSabi.

[Cambios completos del proyecto original](https://github.com/Copexit/am-i-exposed/compare/v0.36.0...v0.37.4)`,
    de_DE: `Am I Exposed? wurde auf 0.37.4 aktualisiert. Eine neu gestaltete Oberfläche mit hellem Modus, Transaktionsflussansichten und einem Graph-Explorer ersetzt die klassische Oberfläche. Die Analyse verbessert die WabiSabi-Erkennung und die Bewertung von Transaktionen mit einem Eingang, Adresswiederverwendung und Kettenmustern. Die Unterstützung für Testnet3 endet; gespeicherte Testnet3-Auswahlen wechseln zum Mainnet. Das Observatorium zeigt Whirlpool und WabiSabi in getrennten Tabs und listet die letzten WabiSabi-Runden auf.

[Alle Änderungen des Ursprungsprojekts](https://github.com/Copexit/am-i-exposed/compare/v0.36.0...v0.37.4)`,
    pl_PL: `Zaktualizowano Am I Exposed? do wersji 0.37.4. Przeprojektowany interfejs z jasnym motywem, widokami przepływu transakcji i eksploratorem grafów zastępuje klasyczny interfejs. Analiza lepiej wykrywa WabiSabi i ocenia transakcje z jednym wejściem, ponowne użycie adresów oraz wzorce łańcuchowe. Kończy się obsługa Testnet3; zapisane wybory Testnet3 wracają do sieci głównej. Obserwatorium rozdziela Whirlpool i WabiSabi na osobne karty i pokazuje ostatnie rundy WabiSabi.

[Pełna lista zmian projektu](https://github.com/Copexit/am-i-exposed/compare/v0.36.0...v0.37.4)`,
    fr_FR: `Am I Exposed? a été mis à jour vers la version 0.37.4. Une interface repensée avec un mode clair, des vues du flux des transactions et un explorateur de graphes remplace l'interface classique. L'analyse améliore la détection de WabiSabi et l'évaluation des transactions à une seule entrée, de la réutilisation d'adresses et des motifs en chaîne. La prise en charge de testnet3 prend fin ; les sélections testnet3 enregistrées reviennent au réseau principal. L'Observatoire sépare Whirlpool et WabiSabi dans des onglets distincts et affiche les tours WabiSabi récents.

[Toutes les modifications du projet d'origine](https://github.com/Copexit/am-i-exposed/compare/v0.36.0...v0.37.4)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
