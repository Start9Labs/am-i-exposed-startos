import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const v_0_35_7_0 = VersionInfo.of({
  version: '0.35.7:0',
  releaseNotes: {
    en_US: `**Bumps**

- Am I Exposed? → 0.35.7
- start-sdk → 1.5.1

**Fixes**

- Upstream nginx container now runs as the correct user, so the web UI starts reliably.`,
    es_ES: `**Cambios de versión**

- Am I Exposed? → 0.35.7
- start-sdk → 1.5.1

**Correcciones**

- El contenedor nginx ahora se ejecuta con el usuario correcto, por lo que la interfaz web arranca de forma fiable.`,
    de_DE: `**Versionssprünge**

- Am I Exposed? → 0.35.7
- start-sdk → 1.5.1

**Fehlerbehebungen**

- Der nginx-Container läuft jetzt unter dem richtigen Benutzer, sodass die Weboberfläche zuverlässig startet.`,
    pl_PL: `**Aktualizacje wersji**

- Am I Exposed? → 0.35.7
- start-sdk → 1.5.1

**Poprawki**

- Kontener nginx działa teraz na poprawnym użytkowniku, dzięki czemu interfejs webowy uruchamia się niezawodnie.`,
    fr_FR: `**Mises à niveau**

- Am I Exposed? → 0.35.7
- start-sdk → 1.5.1

**Corrections**

- Le conteneur nginx s'exécute désormais avec le bon utilisateur, ce qui permet à l'interface web de démarrer de manière fiable.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
