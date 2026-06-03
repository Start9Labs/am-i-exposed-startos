import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.35.7:4',
  releaseNotes: {
    en_US: `Automatically reconnects to Mempool when it restarts (e.g. on update), instead of getting stuck on "Mempool Unreachable" until manually restarted.`,
    es_ES: `Se reconecta automáticamente a Mempool cuando este se reinicia (por ejemplo, al actualizarse), en lugar de quedarse bloqueado en «Mempool no accesible» hasta reiniciarlo manualmente.`,
    de_DE: `Stellt die Verbindung zu Mempool automatisch wieder her, wenn dieser neu startet (z. B. bei einer Aktualisierung), statt bis zum manuellen Neustart bei „Mempool nicht erreichbar“ hängen zu bleiben.`,
    pl_PL: `Automatycznie ponownie łączy się z Mempool po jego restarcie (np. przy aktualizacji), zamiast utknąć na „Mempool nieosiągalny” do czasu ręcznego restartu.`,
    fr_FR: `Se reconnecte automatiquement à Mempool lorsqu'il redémarre (par exemple lors d'une mise à jour), au lieu de rester bloqué sur « Mempool injoignable » jusqu'à un redémarrage manuel.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
