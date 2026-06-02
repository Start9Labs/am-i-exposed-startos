import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.35.7:2',
  releaseNotes: {
    en_US: `Use the official Am I Exposed? logo as the service icon.`,
    es_ES: `Se usa el logotipo oficial de Am I Exposed? como icono del servicio.`,
    de_DE: `Verwendet das offizielle Am-I-Exposed?-Logo als Dienstsymbol.`,
    pl_PL: `Użyto oficjalnego logo Am I Exposed? jako ikony usługi.`,
    fr_FR: `Utilise le logo officiel d'Am I Exposed? comme icône du service.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
