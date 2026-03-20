<p align="center">
  <img src="icon.svg" alt="Am I Exposed? Logo" width="21%">
</p>

# Am I Exposed? on StartOS

> **Upstream docs:** <https://github.com/Copexit/am-i-exposed>
>
> Everything not listed in this document should behave the same as upstream
> Am I Exposed? v0.10.0. If a feature, setting, or behavior is not mentioned
> here, the upstream documentation is accurate and fully applicable.

[Am I Exposed?](https://github.com/Copexit/am-i-exposed) is a client-side Bitcoin privacy analysis tool that grades your transactions and addresses using chain analysis heuristics — the same techniques used by surveillance firms. Paste any Bitcoin address or transaction ID and get a privacy score from 0 to 100 with a letter grade and actionable findings.

---

## Table of Contents

- [Container Runtime](#container-runtime)
- [Volumes](#volumes)
- [Network Interfaces](#network-interfaces)
- [Dependencies](#dependencies)
- [Actions](#actions)
- [Backups](#backups)
- [Health Checks](#health-checks)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Container Runtime

| Property      | Value                                              |
| ------------- | -------------------------------------------------- |
| Image         | `ghcr.io/copexit/am-i-exposed-umbrel:v0.10.0`     |
| Architectures | x86_64, aarch64                                    |
| Entrypoint    | Default (nginx with envsubst template processing)  |

The image is the upstream Umbrel build — a static Next.js export served by nginx, with a reverse proxy to route `/api/*` requests to the local Mempool instance.

## Volumes

| Volume | Mount Point | Purpose         |
| ------ | ----------- | --------------- |
| `main` | `/data`     | Persistent data |

## Network Interfaces

| Interface | Port | Protocol | Purpose                          |
| --------- | ---- | -------- | -------------------------------- |
| Web UI    | 8080 | HTTP     | Privacy scanner web application  |

## Dependencies

| Dependency | Required | Purpose                                           |
| ---------- | -------- | ------------------------------------------------- |
| Mempool    | Yes      | Provides blockchain API data through your own node |

All `/api/*` requests from the browser are reverse-proxied by nginx to the local Mempool instance at `mempool.startos:8080`, so no blockchain queries leave your server.

## Configuration Management

| StartOS-Managed                        | Upstream-Managed |
| -------------------------------------- | ---------------- |
| Mempool API connection (automatic)     | None             |

No user configuration is needed. The Mempool connection is set automatically via environment variables.

## Actions

None.

## Backups

The `main` volume is backed up.

## Health Checks

| Check         | Method                  | Messages                            |
| ------------- | ----------------------- | ----------------------------------- |
| Web Interface | Port listening (8080)   | Ready: "The web interface is ready" |

## Limitations and Differences

1. **No Tor proxy sidecar** — The upstream Umbrel version includes a Tor proxy sidecar for checking `.onion` exposure. This is not included on StartOS. StartOS handles Tor natively.
2. **No Tor proxy endpoint** — The `/tor-proxy/*` nginx location exists but points to a dummy backend and will return 502 if accessed.
3. **Mempool explorer links** — The `/api/local-info` endpoint returns empty values for `mempoolOnion` since Tor is handled differently on StartOS.

## What Is Unchanged from Upstream

- All 31 heuristics and 14 chain analysis modules
- CoinJoin detection (Whirlpool, WabiSabi, JoinMarket)
- Boltzmann entropy calculation via WebAssembly
- Wallet fingerprinting and entity matching
- Privacy scoring (0–100 with letter grades A+ to F)
- Support for mainnet, testnet4, and signet
- 100% client-side analysis in browser
- All 5 language translations (EN, ES, DE, FR, PT)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: am-i-exposed
upstream_version: 0.10.0
image: ghcr.io/copexit/am-i-exposed-umbrel:v0.10.0
architectures: [x86_64, aarch64]
volumes:
  main: /data
ports:
  ui: 8080
dependencies:
  - mempool
startos_managed_env_vars:
  - APP_MEMPOOL_IP
  - APP_MEMPOOL_PORT
  - APP_TOR_PROXY_IP
  - APP_TOR_PROXY_PORT
  - APP_MEMPOOL_HIDDEN_SERVICE
actions: []
health_checks:
  - port_listening: 8080
backup_volumes:
  - main
```
