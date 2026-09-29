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

Paste an address, xpub, or transaction id into the redesigned scanner to see what an outside observer could infer about it. Explore the transaction flow and graph, and choose a light or dark theme. The self-hosted app analyzes mainnet data from your Mempool service; saved testnet3 selections return to mainnet.

Results that link to **View on local mempool** open your own Mempool service — using its public address if you have one set up, otherwise its `.local` address (reachable from your home network).

The **CoinJoin Observatory** shows Whirlpool activity and WabiSabi coordinator statistics. Its data is fetched from external sources through the Tor proxy. Links to those sources open outside the app.

Chainalysis checks also use Tor and fail if Tor is unavailable. Analysis settings, bookmarks and saved graphs stay in your browser and are not included in the service backup.
