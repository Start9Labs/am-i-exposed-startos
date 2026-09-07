import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.35.8:4',
  releaseNotes: {
    en_US: `Updated the bundled Tor proxy to Node.js 24 LTS.

This refreshes its runtime with current security, HTTP/TLS, stream, and performance fixes.

Full Node.js 24 release notes: https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V24.md`,
    es_ES: `Se actualizó el proxy Tor incluido a Node.js 24 LTS.

Esto renueva su entorno de ejecución con correcciones actuales de seguridad, HTTP/TLS, flujos y rendimiento.

Notas completas de la versión Node.js 24: https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V24.md`,
    de_DE: `Der enthaltene Tor-Proxy wurde auf Node.js 24 LTS aktualisiert.

Damit erhält seine Laufzeitumgebung aktuelle Sicherheits-, HTTP/TLS-, Stream- und Leistungsverbesserungen.

Vollständige Versionshinweise zu Node.js 24: https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V24.md`,
    pl_PL: `Wbudowany serwer proxy Tor zaktualizowano do Node.js 24 LTS.

Jego środowisko uruchomieniowe otrzymuje aktualne poprawki bezpieczeństwa, HTTP/TLS, strumieni i wydajności.

Pełne informacje o wydaniu Node.js 24: https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V24.md`,
    fr_FR: `Le proxy Tor intégré a été mis à jour vers Node.js 24 LTS.

Son environnement d'exécution bénéficie ainsi des correctifs actuels de sécurité, HTTP/TLS, flux et performances.

Notes de version complètes de Node.js 24 : https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V24.md`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
