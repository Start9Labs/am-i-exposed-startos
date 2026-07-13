import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.35.8:0',
  releaseNotes: {
    en_US: `Updated Am I Exposed? to 0.35.8.

- Adds HodlHodl peer-to-peer escrow detection, backed by a curated address dataset and a new "p2p-escrow" transaction type in the classifier.
- Adds a CoinJoin Observatory page with Whirlpool and WabiSabi pool statistics.
- Auto-detects the network from a transaction ID when a lookup comes back "not found".
- Shows unconfirmed status on transaction graph nodes.
- Fixes anti-fee-sniping detection for Nunchuk wallets.
- Restores the sample addresses shown for known entities.

Full release notes: https://github.com/Copexit/am-i-exposed/compare/v0.35.7...v0.35.8`,
    es_ES: `Actualiza Am I Exposed? a 0.35.8.

- Añade la detección de depósitos en garantía entre pares (P2P) de HodlHodl, respaldada por un conjunto curado de direcciones y un nuevo tipo de transacción «p2p-escrow» en el clasificador.
- Añade una página del Observatorio CoinJoin con estadísticas de los grupos Whirlpool y WabiSabi.
- Detecta automáticamente la red a partir del ID de una transacción cuando la búsqueda devuelve «no encontrada».
- Muestra el estado sin confirmar en los nodos del gráfico de transacciones.
- Corrige la detección de anti-fee-sniping para las carteras Nunchuk.
- Restaura las direcciones de ejemplo que se muestran para las entidades conocidas.

Notas de la versión completas: https://github.com/Copexit/am-i-exposed/compare/v0.35.7...v0.35.8`,
    de_DE: `Aktualisiert Am I Exposed? auf 0.35.8.

- Fügt die Erkennung von HodlHodl-Peer-to-Peer-Treuhandgeschäften hinzu, gestützt auf einen kuratierten Adressdatensatz und einen neuen Transaktionstyp „p2p-escrow“ im Klassifikator.
- Fügt eine CoinJoin-Observatory-Seite mit Statistiken zu den Whirlpool- und WabiSabi-Pools hinzu.
- Erkennt das Netzwerk automatisch anhand einer Transaktions-ID, wenn eine Abfrage „nicht gefunden“ zurückgibt.
- Zeigt den unbestätigten Status an den Knoten des Transaktionsgraphen an.
- Behebt die Anti-Fee-Sniping-Erkennung für Nunchuk-Wallets.
- Stellt die für bekannte Entitäten angezeigten Beispieladressen wieder her.

Vollständige Versionshinweise: https://github.com/Copexit/am-i-exposed/compare/v0.35.7...v0.35.8`,
    pl_PL: `Aktualizuje Am I Exposed? do 0.35.8.

- Dodaje wykrywanie depozytów powierniczych peer-to-peer HodlHodl, opartych na wyselekcjonowanym zbiorze adresów i nowym typie transakcji „p2p-escrow” w klasyfikatorze.
- Dodaje stronę Obserwatorium CoinJoin ze statystykami pul Whirlpool i WabiSabi.
- Automatycznie wykrywa sieć na podstawie identyfikatora transakcji, gdy wyszukiwanie zwraca „nie znaleziono”.
- Pokazuje status niepotwierdzenia na węzłach grafu transakcji.
- Naprawia wykrywanie anti-fee-sniping dla portfeli Nunchuk.
- Przywraca przykładowe adresy wyświetlane dla znanych podmiotów.

Pełne informacje o wydaniu: https://github.com/Copexit/am-i-exposed/compare/v0.35.7...v0.35.8`,
    fr_FR: `Met à jour Am I Exposed? vers 0.35.8.

- Ajoute la détection des dépôts fiduciaires pair-à-pair HodlHodl, appuyée sur un jeu d'adresses sélectionnées et un nouveau type de transaction « p2p-escrow » dans le classificateur.
- Ajoute une page Observatoire CoinJoin présentant les statistiques des pools Whirlpool et WabiSabi.
- Détecte automatiquement le réseau à partir d'un identifiant de transaction lorsqu'une recherche renvoie « introuvable ».
- Affiche le statut non confirmé sur les nœuds du graphe de transactions.
- Corrige la détection de l'anti-fee-sniping pour les portefeuilles Nunchuk.
- Restaure les adresses d'exemple affichées pour les entités connues.

Notes de version complètes : https://github.com/Copexit/am-i-exposed/compare/v0.35.7...v0.35.8`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
