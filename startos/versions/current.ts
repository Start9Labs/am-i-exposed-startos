import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.43.2:0',
  releaseNotes: {
    en_US:
      'Updated Am I Exposed? to 0.43.2. CoinJoin analysis reduces false JoinMarket detections and adjusts privacy bonuses when evidence suggests a single wallet. Tutorials gain an in-depth graph video and shareable chapter links. Updated start-sdk to 3.1.0. Full upstream changes: https://github.com/Copexit/am-i-exposed/compare/v0.43.1...v0.43.2',
    es_ES:
      'Am I Exposed? se actualizó a 0.43.2. El análisis CoinJoin reduce las detecciones falsas de JoinMarket y ajusta las bonificaciones de privacidad cuando los indicios apuntan a una sola cartera. Los tutoriales incorporan un vídeo detallado sobre grafos y enlaces a capítulos para compartir. Se actualizó start-sdk a 3.1.0. Cambios completos del proyecto original: https://github.com/Copexit/am-i-exposed/compare/v0.43.1...v0.43.2',
    de_DE:
      'Am I Exposed? wurde auf 0.43.2 aktualisiert. Die CoinJoin-Analyse reduziert falsche JoinMarket-Erkennungen und passt Datenschutzboni an, wenn Hinweise auf eine einzelne Wallet vorliegen. Die Anleitungen erhalten ein ausführliches Graph-Video und teilbare Kapitel-Links. start-sdk wurde auf 3.1.0 aktualisiert. Alle Änderungen des Ursprungsprojekts: https://github.com/Copexit/am-i-exposed/compare/v0.43.1...v0.43.2',
    pl_PL:
      'Zaktualizowano Am I Exposed? do wersji 0.43.2. Analiza CoinJoin ogranicza fałszywe rozpoznania JoinMarket i dostosowuje premie za prywatność, gdy dane wskazują na pojedynczy portfel. Poradniki zyskują szczegółowy film o grafach i linki do rozdziałów do udostępniania. Zaktualizowano start-sdk do wersji 3.1.0. Pełna lista zmian projektu: https://github.com/Copexit/am-i-exposed/compare/v0.43.1...v0.43.2',
    fr_FR:
      'Am I Exposed? a été mis à jour vers la version 0.43.2. L’analyse CoinJoin réduit les fausses détections de JoinMarket et ajuste les bonus de confidentialité lorsque les indices suggèrent un seul portefeuille. Les tutoriels ajoutent une vidéo approfondie sur les graphes et des liens de chapitres partageables. start-sdk a été mis à jour vers la version 3.1.0. Toutes les modifications du projet d’origine : https://github.com/Copexit/am-i-exposed/compare/v0.43.1...v0.43.2',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
