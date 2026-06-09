import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.35.7:5',
  releaseNotes: {
    en_US: `Fixes the "View on local mempool" link, which previously pointed to an unreachable address. It now opens your Mempool service, preferring a public domain, then a public IP address, then the local .local address.`,
    es_ES: `Corrige el enlace «Ver en mempool local», que antes apuntaba a una dirección inaccesible. Ahora abre tu servicio Mempool, dando preferencia a un dominio público, luego a una dirección IP pública y, por último, a la dirección .local local.`,
    de_DE: `Behebt den Link „Im lokalen Mempool ansehen“, der zuvor auf eine nicht erreichbare Adresse verwies. Er öffnet jetzt deinen Mempool-Dienst und bevorzugt dabei eine öffentliche Domain, dann eine öffentliche IP-Adresse und zuletzt die lokale .local-Adresse.`,
    pl_PL: `Naprawia link „Zobacz w lokalnym mempoolu”, który wcześniej wskazywał na nieosiągalny adres. Teraz otwiera Twoją usługę Mempool, preferując publiczną domenę, następnie publiczny adres IP, a na końcu lokalny adres .local.`,
    fr_FR: `Corrige le lien « Voir sur le mempool local », qui pointait auparavant vers une adresse injoignable. Il ouvre désormais votre service Mempool, en privilégiant un domaine public, puis une adresse IP publique, et enfin l'adresse .local locale.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
