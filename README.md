<p align="center">
  <img src="icon.svg" alt="Am I Exposed? Logo" width="21%">
</p>

# Am I Exposed? on StartOS

> Everything not listed in this document should behave the same as upstream
> Am I Exposed?. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Am I Exposed?](https://github.com/Copexit/am-i-exposed) grades a Bitcoin address or transaction against the chain-analysis heuristics surveillance firms use. Its scanner offers transaction-flow and graph views. On StartOS chain data comes from your own Mempool instance; external database queries use the bundled Tor proxy.

- **Upstream repo:** <https://github.com/Copexit/am-i-exposed>
- **Wrapper repo:** <https://github.com/Start9Labs/am-i-exposed-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

Two upstream images and two long-running subcontainers: the static application served by nginx, and its HTTP-to-SOCKS proxy. Both images are pinned to the same upstream release; the package carries no local proxy implementation.

| Property      | Value                                                                       |
| ------------- | --------------------------------------------------------------------------- |
| Images        | `ghcr.io/copexit/am-i-exposed-umbrel` and `ghcr.io/copexit/am-i-exposed-tor-proxy` |
| Architectures | x86_64, aarch64                                                             |
| Entrypoint    | Each image's own                                                            |

| Subcontainer | Image       | Purpose                                                                        |
| ------------ | ----------- | ------------------------------------------------------------------------------ |
| `main`       | upstream    | The `primary` daemon — the analyzer and its web UI, and the one to `attach` to |
| `tor-proxy`  | upstream    | A Node HTTP-to-SOCKS proxy that forwards outbound lookups into Tor's SOCKS port |

`primary` requires `tor-proxy`, so the shim is listening before the application can make its first external request.

## Volume and Data Layout

One volume, mounted only into the application.

| Volume | Mount Point | Purpose                                                                    |
| ------ | ----------- | -------------------------------------------------------------------------- |
| `main` | `/data`     | Reserved application data path; the web app stores settings in the browser |

The `tor-proxy` subcontainer mounts nothing — it holds no state and is configured entirely by environment. Analysis settings, bookmarks, saved graphs, and Observatory responses are stored in the browser (localStorage/IndexedDB), not in the service volume.

## File Models

None. The package writes no configuration file: everything it needs to tell the application is passed as environment on each start, and it keeps no `store.json`. There is nothing on disk to inspect or correct.

Both subcontainers are configured this way:

| Variable                                 | Subcontainer | Value                                                              |
| ---------------------------------------- | ------------ | ------------------------------------------------------------------ |
| `PORT`, `TOR_PROXY_IP`, `TOR_PROXY_PORT` | `tor-proxy` | The proxy's HTTP port and Tor's SOCKS bridge IP and port |
| `APP_MEMPOOL_IP`, `APP_MEMPOOL_PORT`     | `main`       | Mempool's web UI, split out of its bridge address                  |
| `APP_TOR_PROXY_IP`, `APP_TOR_PROXY_PORT` | `main`       | The shim, on loopback inside the service                           |
| `APP_MEMPOOL_EXTERNAL_URL`               | `main`       | A browser-reachable address for Mempool — see below                |
| `APP_MEMPOOL_HIDDEN_SERVICE`             | `main`       | Always empty; the onion variant is not used                        |

`APP_MEMPOOL_EXTERNAL_URL` is what the results page's "view on local mempool" links point at, so unlike the others it has to be an address _your browser_ can reach, not one the container can. The package picks the first of Mempool's public domain, its public IP, or its mDNS `.local` name, and passes an empty string if it has none — which upstream treats as "no link" rather than a broken one.

## Dependencies

Two, both required, and each is required in the strong sense: the service will not run without them.

| Dependency | Kind      | Health check | Mounts | Why                                                            |
| ---------- | --------- | ------------ | ------ | -------------------------------------------------------------- |
| Mempool    | `running` | `webui`      | none   | All chain data, queried from your node instead of a public API |
| Tor        | `running` | `tor`        | none   | Outbound lookups against external surveillance databases       |

Both are reached at addresses resolved from their own bindings over the service bridge, so nothing needs configuring and a dependency's update does not move its address.

**The service holds while Mempool is unhealthy, and restarts itself when Mempool returns.** The application connects to Mempool once at startup and never reconnects on its own, so a Mempool restart — an update, for instance — would otherwise leave the UI reporting Mempool unreachable until someone restarted this service by hand. It refuses to run while Mempool's `webui` check is not passing, and comes back on its own when it is.

## Network Access and Interfaces

One interface. Nothing is exported for dependent services, and the Tor proxy is never published.

| Interface | Id   | Type | Port | Description                     |
| --------- | ---- | ---- | ---- | ------------------------------- |
| Web UI    | `ui` | ui   | 8080 | The Am I Exposed? web interface |

The port is bound on the `ui-multi` MultiHost and is not masked. Nginx forwards `/api/` to Mempool's web UI over the bridge, including transaction broadcasts requested in the UI. `/api/local-info` supplies the browser-facing Mempool URL; the app detects the backend's network through `/api/block-height/0` without a package-provided network hint.

Nginx forwards `/tor-proxy/` to the sidecar on loopback. The upstream proxy owns the allowlisted `/svc/` routes for CoinJoin attribution, Whirlpool/WabiSabi statistics and P2P market data, including Tor-routed Nostr relay snapshots, plus the Chainalysis address route. It prefers service onion endpoints when the upstream registry lists them, uses SOCKS-side DNS and has no direct-connection fallback.

## Installation and First-Run Flow

Nothing is generated, asked, or bootstrapped at install, and no task is raised. There is one ordering constraint, and it comes from the dependency gate rather than from setup: **Mempool must be installed and running, with its web UI healthy, before this service will start.** Until then the service holds rather than starting into an error state.

Tor must be installed and running too, but it is not gated the same way: its address resolves to a fixed fallback port, so a missing Tor surfaces as external lookups failing rather than as a service that will not start.

## Actions

None.

## Tasks

None. This package raises no tasks, so the service is never held on a prompt and its ordinary controls are always available.

## Health Checks

Two checks, but only one is shown to you.

| Check       | Displayed       | Method                       | Grace Period |
| ----------- | --------------- | ---------------------------- | ------------ |
| `primary`   | "Web Interface" | Port 8080 is listening       | SDK default  |
| `tor-proxy` | — internal      | The shim's port is listening | SDK default  |

**`primary` failing** means the analyzer is not serving. Because it cannot start until Mempool is healthy, a failure here after a period of running points at the application rather than at a dependency.

**`tor-proxy` has `display: null`** — it exists so that a dead shim restarts the service, not to be read. A service that keeps restarting with no failing check on screen is this one failing; the service logs name it.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`. No dump step and nothing excluded.

The server holds no accounts; analysis is performed per request against Mempool. Browser-stored settings, bookmarks and saved graphs are outside the service backup. A restored instance needs its two dependencies present before it will start.

## Limitations and Differences

1. **Mempool and Tor are both required.** Neither can be pointed at an external instance — the addresses come from the local dependency's own bindings.
2. **The service will not start while Mempool's web UI is unhealthy**, by design, rather than starting and reporting an unreachable backend.
3. **The onion route to Mempool is not used.** `APP_MEMPOOL_HIDDEN_SERVICE` is always empty; the application reaches Mempool over the local bridge instead, which is faster and no less private.
4. **External lookups are Tor-only.** Chainalysis checks, CoinJoin service checks and Observatory data use the upstream sidecar and fail rather than falling back to clearnet if Tor is not running.
5. **The local backend determines the network.** There is no package setting to select a different chain or configure a network hint; supported networks are detected from Mempool's genesis block.
6. **No riscv64 build.** x86_64 and aarch64 only.

---

## Quick Reference for AI Consumers

```yaml
package_id: am-i-exposed
image: ghcr.io/copexit/am-i-exposed-umbrel # with ghcr.io/copexit/am-i-exposed-tor-proxy
architectures:
  - x86_64
  - aarch64
subcontainers:
  - main # the analyzer; the one to attach to
  - tor-proxy # HTTP-to-SOCKS shim
volumes:
  main: /data
file_models: []
startos_managed_env_vars:
  - PORT # tor-proxy
  - TOR_PROXY_IP # tor-proxy
  - TOR_PROXY_PORT # tor-proxy
  - APP_MEMPOOL_IP
  - APP_MEMPOOL_PORT
  - APP_TOR_PROXY_IP
  - APP_TOR_PROXY_PORT
  - APP_MEMPOOL_EXTERNAL_URL
  - APP_MEMPOOL_HIDDEN_SERVICE # always empty
dependencies:
  - mempool # required; gated on its webui health check
  - tor # required
interfaces:
  ui: { type: ui, port: 8080 }
actions: []
tasks: []
health_checks:
  - primary # displayed "Web Interface"
  - tor-proxy # internal
```
