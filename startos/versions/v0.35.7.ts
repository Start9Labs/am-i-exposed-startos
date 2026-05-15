import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const v_0_35_7 = VersionInfo.of({
  version: '0.35.7:0',
  releaseNotes: {
    en_US: `**Bumps**

- Am I Exposed? → 0.35.7
- start-sdk → 1.5.1

**Features**

- Polish (pl) UI translation
- Testnet3 network support alongside Mainnet, Testnet4, and Signet
- Whirlpool detection now distinguishes Samourai-era from Ashigaru pools by denomination

**Fixes**

- Nginx in the upstream image now runs as the \`nginx\` user (UID 101); previously the templated config never landed and the container was unhealthy
- Reworked H2 change-detection confidence, signals, and per-signal transparency
- Inline graph canvas now supports drag-to-pan and zoom
- Corrected antiFeeSniping flags for Trezor Suite, Cake, BlueWallet, and BitBox
- Corrected silentPayments flags for Bitcoin Core and Nunchuk
- RoboSats link updated to learn.robosats.org`,
    es_ES: `**Actualizaciones**

- Am I Exposed? → 0.35.7
- start-sdk → 1.5.1

**Novedades**

- Traducción al polaco (pl) de la interfaz
- Soporte para la red Testnet3 junto a Mainnet, Testnet4 y Signet
- La detección de Whirlpool ahora distingue las pools de la era Samourai de las de Ashigaru por denominación

**Correcciones**

- Nginx en la imagen original ahora se ejecuta como el usuario \`nginx\` (UID 101); antes la configuración no se generaba y el contenedor quedaba en mal estado
- Rediseño de la confianza, señales y transparencia por señal de la detección de cambio H2
- El lienzo gráfico en línea ahora admite arrastrar para desplazarse y hacer zoom
- Corregidos los indicadores de antiFeeSniping para Trezor Suite, Cake, BlueWallet y BitBox
- Corregidos los indicadores de silentPayments para Bitcoin Core y Nunchuk
- Enlace de RoboSats actualizado a learn.robosats.org`,
    de_DE: `**Aktualisierungen**

- Am I Exposed? → 0.35.7
- start-sdk → 1.5.1

**Neuerungen**

- Polnische (pl) Oberflächenübersetzung
- Unterstützung für das Testnet3-Netzwerk neben Mainnet, Testnet4 und Signet
- Whirlpool-Erkennung unterscheidet anhand der Stückelung jetzt zwischen Samourai- und Ashigaru-Ära

**Fehlerbehebungen**

- Nginx im Upstream-Image läuft nun als Benutzer \`nginx\` (UID 101); zuvor wurde die Vorlagenkonfiguration nicht geschrieben und der Container war ungesund
- Vertrauen, Signale und Transparenz pro Signal der H2-Änderungserkennung überarbeitet
- Eingebettete Graph-Leinwand unterstützt jetzt Ziehen zum Verschieben und Zoomen
- antiFeeSniping-Markierungen für Trezor Suite, Cake, BlueWallet und BitBox korrigiert
- silentPayments-Markierungen für Bitcoin Core und Nunchuk korrigiert
- RoboSats-Link auf learn.robosats.org aktualisiert`,
    pl_PL: `**Aktualizacje**

- Am I Exposed? → 0.35.7
- start-sdk → 1.5.1

**Nowości**

- Polskie (pl) tłumaczenie interfejsu
- Obsługa sieci Testnet3 obok Mainnet, Testnet4 i Signet
- Wykrywanie Whirlpool rozróżnia teraz pule z ery Samourai od Ashigaru na podstawie nominału

**Poprawki**

- Nginx w obrazie upstream uruchamia się teraz jako użytkownik \`nginx\` (UID 101); wcześniej konfiguracja z szablonu nie była zapisywana i kontener był niesprawny
- Przeprojektowano pewność, sygnały i przejrzystość poszczególnych sygnałów wykrywania zmiany H2
- Wbudowane płótno grafu obsługuje teraz przeciąganie do przewijania i powiększanie
- Poprawiono oznaczenia antiFeeSniping dla Trezor Suite, Cake, BlueWallet i BitBox
- Poprawiono oznaczenia silentPayments dla Bitcoin Core i Nunchuk
- Zaktualizowano link RoboSats do learn.robosats.org`,
    fr_FR: `**Mises à niveau**

- Am I Exposed? → 0.35.7
- start-sdk → 1.5.1

**Nouveautés**

- Traduction polonaise (pl) de l'interface
- Prise en charge du réseau Testnet3 aux côtés de Mainnet, Testnet4 et Signet
- La détection Whirlpool distingue désormais les pools de l'ère Samourai de celles d'Ashigaru selon la dénomination

**Corrections**

- Nginx dans l'image upstream s'exécute désormais sous l'utilisateur \`nginx\` (UID 101) ; auparavant la configuration générée n'était pas écrite et le conteneur restait défaillant
- Refonte de la confiance, des signaux et de la transparence par signal de la détection de changement H2
- Le canevas de graphe intégré prend désormais en charge le défilement par glisser et le zoom
- Indicateurs antiFeeSniping corrigés pour Trezor Suite, Cake, BlueWallet et BitBox
- Indicateurs silentPayments corrigés pour Bitcoin Core et Nunchuk
- Lien RoboSats mis à jour vers learn.robosats.org`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
