import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.36.0:0',
  releaseNotes: {
    en_US: `Updated Am I Exposed? to 0.36.0. The CoinJoin Observatory now works, fetching its statistics over Tor. Analysis improves detection of Wasabi 1.x mixes and corrects scoring for address reuse and failed data fetches. Chainalysis rate limits are now reported as such.

[Full upstream changes](https://github.com/Copexit/am-i-exposed/compare/v0.35.8...v0.36.0)`,
    es_ES: `Am I Exposed? se actualizó a 0.36.0. El Observatorio CoinJoin ya funciona y obtiene sus estadísticas a través de Tor. El análisis detecta mejor las mezclas de Wasabi 1.x y corrige las puntuaciones para la reutilización de direcciones y los errores al obtener datos. Los límites de solicitudes de Chainalysis ahora se muestran como tales.

[Cambios completos del proyecto original](https://github.com/Copexit/am-i-exposed/compare/v0.35.8...v0.36.0)`,
    de_DE: `Am I Exposed? wurde auf 0.36.0 aktualisiert. Das CoinJoin-Observatorium funktioniert jetzt und ruft seine Statistiken über Tor ab. Die Analyse erkennt Wasabi-1.x-Mixes besser und korrigiert Bewertungen bei wiederverwendeten Adressen und fehlgeschlagenen Datenabfragen. Ratenbegrenzungen von Chainalysis werden jetzt als solche gemeldet.

[Alle Änderungen des Ursprungsprojekts](https://github.com/Copexit/am-i-exposed/compare/v0.35.8...v0.36.0)`,
    pl_PL: `Zaktualizowano Am I Exposed? do wersji 0.36.0. Obserwatorium CoinJoin teraz działa, pobierając statystyki przez Tor. Analiza lepiej wykrywa miksy Wasabi 1.x i poprawia oceny przy ponownym użyciu adresów oraz błędach pobierania danych. Limity zapytań Chainalysis są teraz zgłaszane jako takie.

[Pełna lista zmian projektu](https://github.com/Copexit/am-i-exposed/compare/v0.35.8...v0.36.0)`,
    fr_FR: `Am I Exposed? a été mis à jour vers la version 0.36.0. L'Observatoire CoinJoin fonctionne désormais et récupère ses statistiques via Tor. L'analyse détecte mieux les mixages Wasabi 1.x et corrige les scores en cas de réutilisation d'adresse ou d'échec de récupération des données. Les limites de débit de Chainalysis sont désormais signalées comme telles.

[Toutes les modifications du projet d'origine](https://github.com/Copexit/am-i-exposed/compare/v0.35.8...v0.36.0)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
