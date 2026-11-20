import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.43.3:0',
  releaseNotes: {
    en_US:
      'Updated Am I Exposed? to 0.43.3. A coin in the wallet UTXO list can now be frozen so coin selection leaves it out. Full changes: https://github.com/Copexit/am-i-exposed/compare/v0.43.2...v0.43.3',
    es_ES:
      'Am I Exposed? actualizado a 0.43.3. Ahora se puede congelar una moneda en la lista de UTXO de la cartera para que la selección de monedas la excluya. Cambios completos: https://github.com/Copexit/am-i-exposed/compare/v0.43.2...v0.43.3',
    de_DE:
      'Am I Exposed? auf 0.43.3 aktualisiert. Eine Münze in der UTXO-Liste der Wallet lässt sich jetzt einfrieren, sodass die Münzauswahl sie auslässt. Alle Änderungen: https://github.com/Copexit/am-i-exposed/compare/v0.43.2...v0.43.3',
    pl_PL:
      'Zaktualizowano Am I Exposed? do 0.43.3. Monetę na liście UTXO portfela można teraz zamrozić, aby wybór monet ją pomijał. Pełna lista zmian: https://github.com/Copexit/am-i-exposed/compare/v0.43.2...v0.43.3',
    fr_FR:
      'Am I Exposed? mis à jour vers 0.43.3. Une pièce de la liste des UTXO du portefeuille peut désormais être gelée pour que la sélection des pièces l’ignore. Modifications complètes : https://github.com/Copexit/am-i-exposed/compare/v0.43.2...v0.43.3',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
