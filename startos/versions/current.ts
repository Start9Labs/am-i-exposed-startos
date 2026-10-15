import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.43.0:0',
  releaseNotes: {
    en_US: `Updated Am I Exposed? to 0.43.0. The graph explorer adds connection searches with link-certainty scores, chronological layouts, batch editing and BIP329 graph labels. Browser backups gain password protection, with optional wallet scans and settings; saved wallet keys can also be password-locked. These encryption features need a secure browser context, such as trusted HTTPS. Passwords cannot be recovered.

[Full upstream changes](https://github.com/Copexit/am-i-exposed/compare/v0.42.2...v0.43.0)`,
    es_ES: `Am I Exposed? se actualizó a 0.43.0. El explorador de grafos incorpora búsquedas de conexiones con puntuaciones de certeza de los vínculos, diseños cronológicos, edición por lotes y etiquetas BIP329. Las copias de seguridad del navegador ofrecen protección con contraseña e incluyen opcionalmente análisis de carteras y ajustes; las claves de las carteras guardadas también se pueden bloquear con contraseña. Estas funciones de cifrado requieren un contexto seguro del navegador, como HTTPS de confianza. Las contraseñas no se pueden recuperar.

[Cambios completos del proyecto original](https://github.com/Copexit/am-i-exposed/compare/v0.42.2...v0.43.0)`,
    de_DE: `Am I Exposed? wurde auf 0.43.0 aktualisiert. Der Graph-Explorer ergänzt Verbindungssuchen mit Bewertungen der Verknüpfungssicherheit, chronologische Layouts, Stapelbearbeitung und BIP329-Graph-Labels. Browser-Sicherungen erhalten Passwortschutz und können optional Wallet-Analysen und Einstellungen enthalten; gespeicherte Wallet-Schlüssel lassen sich ebenfalls mit einem Passwort sperren. Diese Verschlüsselungsfunktionen benötigen einen sicheren Browserkontext, etwa vertrauenswürdiges HTTPS. Passwörter können nicht wiederhergestellt werden.

[Alle Änderungen des Ursprungsprojekts](https://github.com/Copexit/am-i-exposed/compare/v0.42.2...v0.43.0)`,
    pl_PL: `Zaktualizowano Am I Exposed? do wersji 0.43.0. Eksplorator grafów dodaje wyszukiwanie połączeń z oceną pewności powiązań, układy chronologiczne, edycję zbiorczą i etykiety BIP329. Kopie zapasowe danych przeglądarki zyskują ochronę hasłem oraz opcjonalne analizy portfeli i ustawienia; zapisane klucze portfeli można również blokować hasłem. Te funkcje szyfrowania wymagają bezpiecznego kontekstu przeglądarki, np. zaufanego HTTPS. Haseł nie można odzyskać.

[Pełna lista zmian projektu](https://github.com/Copexit/am-i-exposed/compare/v0.42.2...v0.43.0)`,
    fr_FR: `Am I Exposed? a été mis à jour vers la version 0.43.0. L'explorateur de graphes ajoute la recherche de connexions avec des scores de certitude des liens, des dispositions chronologiques, l'édition par lots et les étiquettes BIP329. Les sauvegardes du navigateur bénéficient d'une protection par mot de passe et peuvent inclure les analyses de portefeuilles et les paramètres ; les clés des portefeuilles enregistrés peuvent aussi être verrouillées par mot de passe. Ces fonctions de chiffrement nécessitent un contexte sécurisé du navigateur, comme HTTPS de confiance. Les mots de passe ne peuvent pas être récupérés.

[Toutes les modifications du projet d'origine](https://github.com/Copexit/am-i-exposed/compare/v0.42.2...v0.43.0)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
