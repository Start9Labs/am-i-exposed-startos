import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.36.0:0',
  releaseNotes: {
    en_US: `Updated Am I Exposed? to 0.36.0. CoinJoin Observatory statistics now load through Tor; analysis improves detection of Wasabi 1.x mixes and corrects scoring for address reuse and failed data fetches. Chainalysis rate limits are reported rather than mistaken for a proxy outage.

[Full upstream changes](https://github.com/Copexit/am-i-exposed/compare/v0.35.8...v0.36.0)`,
    es_ES: `Am I Exposed? se actualizó a 0.36.0. Las estadísticas del Observatorio CoinJoin ahora se cargan a través de Tor; el análisis detecta mejor las mezclas de Wasabi 1.x y corrige las puntuaciones para la reutilización de direcciones y los errores al obtener datos. Los límites de solicitudes de Chainalysis se muestran en vez de confundirse con una caída del proxy.

[Cambios completos del proyecto original](https://github.com/Copexit/am-i-exposed/compare/v0.35.8...v0.36.0)`,
    de_DE: `Am I Exposed? wurde auf 0.36.0 aktualisiert. Statistiken des CoinJoin-Observatoriums werden jetzt über Tor geladen; die Analyse erkennt Wasabi-1.x-Mixes besser und korrigiert Bewertungen bei wiederverwendeten Adressen und fehlgeschlagenen Datenabfragen. Ratenbegrenzungen von Chainalysis werden statt eines Proxy-Ausfalls gemeldet.

[Alle Änderungen des Ursprungsprojekts](https://github.com/Copexit/am-i-exposed/compare/v0.35.8...v0.36.0)`,
    pl_PL: `Zaktualizowano Am I Exposed? do wersji 0.36.0. Statystyki Obserwatorium CoinJoin są teraz pobierane przez Tor; analiza lepiej wykrywa miksy Wasabi 1.x i poprawia oceny przy ponownym użyciu adresów oraz błędach pobierania danych. Limity zapytań Chainalysis są zgłaszane zamiast błędu serwera proxy.

[Pełna lista zmian projektu](https://github.com/Copexit/am-i-exposed/compare/v0.35.8...v0.36.0)`,
    fr_FR: `Am I Exposed? a été mis à jour vers la version 0.36.0. Les statistiques de l'Observatoire CoinJoin passent désormais par Tor ; l'analyse détecte mieux les mixages Wasabi 1.x et corrige les scores en cas de réutilisation d'adresse ou d'échec de récupération des données. Les limites de débit de Chainalysis sont signalées au lieu d'être confondues avec une panne du proxy.

[Toutes les modifications du projet d'origine](https://github.com/Copexit/am-i-exposed/compare/v0.35.8...v0.36.0)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
