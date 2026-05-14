<p align="center">
  <img src="icon.svg" alt="Am I Exposed? Logo" width="21%">
</p>

# Am I Exposed? on StartOS

> **Upstream docs:** <https://github.com/Copexit/am-i-exposed>
>
> Everything not listed in this document should behave the same as upstream
> Am I Exposed?. If a feature, setting, or behavior is not mentioned
> here, the upstream documentation is accurate and fully applicable.

[Am I Exposed?](https://github.com/Copexit/am-i-exposed) is a client-side Bitcoin privacy analysis tool that grades your transactions and addresses using chain analysis heuristics — the same techniques used by surveillance firms. Paste any Bitcoin address or transaction ID and get a privacy score from 0 to 100 with a letter grade and actionable findings.

---

## Table of Contents

- [Container Runtime](#container-runtime)
- [Volumes](#volumes)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
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

| Image       | Source                                             | Purpose                              |
| ----------- | -------------------------------------------------- | ------------------------------------ |
| main        | `ghcr.io/copexit/am-i-exposed-umbrel`              | Nginx serving static frontend + API proxy |
| tor-proxy   | Custom build (`tor-proxy/Dockerfile`)              | HTTP-to-SOCKS bridge for Chainalysis lookups |

Architectures: x86_64, aarch64

The main image is the upstream Umbrel build — a static Next.js export served by nginx, with a reverse proxy to route `/api/*` requests to the local Mempool instance. The tor-proxy sidecar forwards Chainalysis address checks through Tor's SOCKS5 proxy for private surveillance database lookups.

## Volumes

| Volume | Mount Point | Purpose         |
| ------ | ----------- | --------------- |
| `main` | `/data`     | Persistent data |

## Installation and First-Run Flow

No special setup is required. The service starts immediately with no wizards, credentials, or initial configuration. Both the Mempool and Tor dependencies must be installed and running.

## Network Interfaces

| Interface | Port | Protocol | Purpose                          |
| --------- | ---- | -------- | -------------------------------- |
| Web UI    | 8080 | HTTP     | Privacy scanner web application  |

## Dependencies

### Mempool (required)

| Property | Value |
|----------|-------|
| Version constraint | `>= 3.2.1` |
| Required state | Running |
| Health checks | `webui` |
| Mounted volumes | None |
| Purpose | Blockchain API data through your own node |

All `/api/*` requests from the browser are reverse-proxied by nginx to the local Mempool instance at `mempool.startos:8080`, so no blockchain queries leave your server.

### Tor (required)

| Property | Value |
|----------|-------|
| Version constraint | `>= 0.4.9.5` |
| Required state | Running |
| Health checks | `tor` |
| Mounted volumes | None |
| Purpose | SOCKS5 proxy for private Chainalysis address lookups |

Chainalysis address checks are routed through Tor via the tor-proxy sidecar for private surveillance database lookups.

## Configuration Management

| StartOS-Managed                                  | Upstream-Managed |
| ------------------------------------------------ | ---------------- |
| Mempool API connection (automatic)               | None             |
| Tor proxy connection (automatic via tor.startos) | None             |

No user configuration is needed. Both connections are set automatically via environment variables.

## Actions

None.

## Backups

The `main` volume is backed up.

## Health Checks

| Check         | Method                  | Display | Messages                            |
| ------------- | ----------------------- | ------- | ----------------------------------- |
| Tor Proxy     | Port listening (3001)   | Hidden  | Ready: "Tor proxy is ready"        |
| Web Interface | Port listening (8080)   | Shown   | Ready: "The web interface is ready" |

## Limitations and Differences

1. **Mempool explorer links** — The `/api/local-info` endpoint returns empty values for `mempoolOnion` since Tor is handled differently on StartOS.

## What Is Unchanged from Upstream

- All 31 heuristics and 14 chain analysis modules
- CoinJoin detection (Whirlpool, WabiSabi, JoinMarket)
- Boltzmann entropy calculation via WebAssembly
- Wallet fingerprinting and entity matching
- Chainalysis address exposure checks (via Tor proxy)
- Privacy scoring (0–100 with letter grades A+ to F)
- Support for mainnet, testnet3, testnet4, and signet
- 100% client-side analysis in browser
- All 6 language translations (EN, ES, DE, FR, PT, PL)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: am-i-exposed
images:
  main: ghcr.io/copexit/am-i-exposed-umbrel
  tor-proxy: custom build (tor-proxy/Dockerfile)
architectures: [x86_64, aarch64]
volumes:
  main: /data
ports:
  ui: 8080
  tor-proxy: 3001 (internal)
dependencies:
  - mempool
  - tor
startos_managed_env_vars:
  main:
    - APP_MEMPOOL_IP
    - APP_MEMPOOL_PORT
    - APP_TOR_PROXY_IP
    - APP_TOR_PROXY_PORT
    - APP_MEMPOOL_HIDDEN_SERVICE
  tor-proxy:
    - PORT
    - TOR_PROXY_IP
    - TOR_PROXY_PORT
actions: []
health_checks:
  - port_listening: 3001
  - port_listening: 8080
backup_volumes:
  - main
```
