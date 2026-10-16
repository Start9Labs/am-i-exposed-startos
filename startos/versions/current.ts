import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.43.1:0',
  releaseNotes: {
    en_US:
      'Updated Am I Exposed? to 0.43.1. Graph connection searches no longer hang or fail when the destination address history is unavailable: the lookup times out after 15 seconds, and matching transactions reached from the starting side can still reveal the connection. Full upstream changes: https://github.com/Copexit/am-i-exposed/compare/v0.43.0...v0.43.1',
    es_ES:
      'Am I Exposed? se actualizó a 0.43.1. Las búsquedas de conexiones del grafo ya no se bloquean ni fallan cuando el historial de la dirección de destino no está disponible: la consulta caduca tras 15 segundos y las transacciones coincidentes alcanzadas desde el origen aún pueden revelar la conexión. Cambios completos del proyecto original: https://github.com/Copexit/am-i-exposed/compare/v0.43.0...v0.43.1',
    de_DE:
      'Am I Exposed? wurde auf 0.43.1 aktualisiert. Verbindungssuchen im Graphen hängen oder scheitern nicht mehr, wenn der Verlauf der Zieladresse nicht verfügbar ist: Die Abfrage endet nach 15 Sekunden, und passende Transaktionen von der Startseite können die Verbindung weiterhin aufzeigen. Alle Änderungen des Ursprungsprojekts: https://github.com/Copexit/am-i-exposed/compare/v0.43.0...v0.43.1',
    pl_PL:
      'Zaktualizowano Am I Exposed? do wersji 0.43.1. Wyszukiwanie połączeń w grafie nie zawiesza się ani nie kończy błędem, gdy historia adresu docelowego jest niedostępna: zapytanie ma limit 15 sekund, a pasujące transakcje znalezione od strony początkowej nadal mogą ujawnić połączenie. Pełna lista zmian projektu: https://github.com/Copexit/am-i-exposed/compare/v0.43.0...v0.43.1',
    fr_FR:
      'Am I Exposed? a été mis à jour vers la version 0.43.1. Les recherches de connexions du graphe ne restent plus bloquées et ne se soldent plus par un échec lorsque l’historique de l’adresse de destination est indisponible : la requête expire après 15 secondes et les transactions correspondantes atteintes depuis le point de départ peuvent toujours révéler la connexion. Toutes les modifications du projet d’origine : https://github.com/Copexit/am-i-exposed/compare/v0.43.0...v0.43.1',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
