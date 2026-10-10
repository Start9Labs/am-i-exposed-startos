# Am I Exposed?

## Documentation

- [Am I Exposed? docs](https://github.com/Copexit/am-i-exposed/tree/main/docs) — upstream documentation for the privacy and exposure analysis tool.

## What you get on StartOS

- A **Web UI** that analyzes how exposed your on-chain Bitcoin activity is — address clustering, transaction graph hints, and the heuristics chain analysis companies use.
- A bundled Tor proxy that lets the analyzer reach external services over Tor.

## Getting set up

Am I Exposed? requires two dependencies — install and start each before launching:

1. Install and start the **Mempool** package. The analyzer talks to it for on-chain data.
2. Install and start the **Tor** package, used by the bundled proxy to fetch external lookups privately.
3. Start Am I Exposed? and open the **Web UI** to start analyzing.

## Using Am I Exposed?

### Web UI

Paste an address, xpub, descriptor or transaction id into the scanner to see what an outside observer could infer about it. You can also analyze a PSBT or signed transaction before sending it. Explore the transaction flow and graph, or use wallet scans for coin selection advice and BIP329 labels. Saving a wallet in your browser is optional.

The app detects the network of your Mempool service: mainnet, signet and testnet4 are supported. Testnet3 and regtest are reported as unsupported. If you choose to broadcast a signed transaction, it is sent through your Mempool; analysis alone does not broadcast it.

Results that link to **View on local mempool** open your own Mempool service — using its public address if you have one set up, otherwise its `.local` address (reachable from your home network).

The **Observatory** shows Whirlpool activity, WabiSabi coordinator statistics and a live flow map, plus P2P market offers from RoboSats, Mostro and HodlHodl. Its data is fetched from external sources through Tor. Links to those sources open outside the app.

Chainalysis checks and opt-in CoinJoin service checks also use Tor and fail if Tor is unavailable. Service checks send transaction IDs to the selected external services through Tor. Analysis settings, bookmarks, saved graphs, wallets and labels stay in your browser and are not included in the service backup.
