import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { upstreamVersion } from '../utils'

export const current = VersionInfo.of({
  version: `${upstreamVersion}:0`,
  releaseNotes: {
    en_US: `Updated Am I Exposed? to 0.42.1.

- Analyze PSBTs and signed transactions before sending, with opt-in broadcast through your Mempool.
- Wallet scans gain privacy-aware coin selection, BIP329 labels, saved wallets and checks for post-mix merges and change exposure.
- The Observatory adds a live WabiSabi map and P2P markets. CoinJoin service checks and Observatory requests use the matching upstream Tor proxy.
- The app detects your Mempool's network instead of assuming mainnet; signet and testnet4 are supported, while testnet3 and regtest are reported as unsupported.

[Full upstream changes](https://github.com/Copexit/am-i-exposed/compare/v0.37.5...v0.42.1)`,
    es_ES: `Am I Exposed? se actualizó a 0.42.1.

- Analiza PSBT y transacciones firmadas antes de enviarlas, con difusión opcional a través de tu Mempool.
- El análisis de carteras incorpora selección de monedas orientada a la privacidad, etiquetas BIP329, carteras guardadas y comprobaciones de fusiones posteriores a las mezclas y exposición del cambio.
- El Observatorio añade un mapa WabiSabi en directo y mercados P2P. Las comprobaciones de servicios CoinJoin y las solicitudes del Observatorio usan el proxy Tor de la misma versión del proyecto original.
- La aplicación detecta la red de tu Mempool en lugar de asumir la red principal; admite signet y testnet4 e indica que testnet3 y regtest no son compatibles.

[Cambios completos del proyecto original](https://github.com/Copexit/am-i-exposed/compare/v0.37.5...v0.42.1)`,
    de_DE: `Am I Exposed? wurde auf 0.42.1 aktualisiert.

- PSBTs und signierte Transaktionen vor dem Senden analysieren, mit optionaler Übertragung über den eigenen Mempool.
- Wallet-Analysen erhalten datenschutzorientierte Coin-Auswahl, BIP329-Labels, gespeicherte Wallets und Prüfungen auf Zusammenführungen nach CoinJoins und offengelegtes Wechselgeld.
- Das Observatorium ergänzt eine WabiSabi-Live-Karte und P2P-Märkte. CoinJoin-Dienstprüfungen und Observatoriumsanfragen nutzen den passenden Tor-Proxy des Ursprungsprojekts.
- Die App erkennt das Netzwerk des eigenen Mempools, statt Mainnet anzunehmen; Signet und Testnet4 werden unterstützt, Testnet3 und Regtest als nicht unterstützt gemeldet.

[Alle Änderungen des Ursprungsprojekts](https://github.com/Copexit/am-i-exposed/compare/v0.37.5...v0.42.1)`,
    pl_PL: `Zaktualizowano Am I Exposed? do wersji 0.42.1.

- Analiza PSBT i podpisanych transakcji przed wysłaniem, z opcjonalnym rozgłaszaniem przez Twój Mempool.
- Skanowanie portfeli zyskuje dobór monet z uwzględnieniem prywatności, etykiety BIP329, zapisane portfele oraz wykrywanie łączenia monet po miksowaniu i ujawniania reszty.
- Obserwatorium dodaje mapę WabiSabi na żywo i rynki P2P. Sprawdzanie usług CoinJoin i zapytania Obserwatorium używają proxy Tor z tej samej wersji projektu upstream.
- Aplikacja wykrywa sieć Twojego Mempoola zamiast zakładać mainnet; obsługuje signet i testnet4, a testnet3 i regtest zgłasza jako nieobsługiwane.

[Pełna lista zmian projektu](https://github.com/Copexit/am-i-exposed/compare/v0.37.5...v0.42.1)`,
    fr_FR: `Am I Exposed? a été mis à jour vers la version 0.42.1.

- Analysez les PSBT et les transactions signées avant l'envoi, avec diffusion facultative via votre Mempool.
- L'analyse des portefeuilles ajoute la sélection de pièces axée sur la confidentialité, les étiquettes BIP329, les portefeuilles enregistrés et la détection des regroupements après mixage et de l'exposition de la monnaie rendue.
- L'Observatoire ajoute une carte WabiSabi en direct et les marchés P2P. Les vérifications des services CoinJoin et les requêtes de l'Observatoire utilisent le proxy Tor correspondant du projet d'origine.
- L'application détecte le réseau de votre Mempool au lieu de supposer le réseau principal ; signet et testnet4 sont pris en charge, tandis que testnet3 et regtest sont signalés comme non pris en charge.

[Toutes les modifications du projet d'origine](https://github.com/Copexit/am-i-exposed/compare/v0.37.5...v0.42.1)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
