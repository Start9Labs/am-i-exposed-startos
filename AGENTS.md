# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `am-i-exposed`.** A leaf UI service — it exports only the `ui` web interface and nothing for dependents.
- **Two subcontainers:** `main` (the upstream nginx + static frontend image) and `tor-proxy` (a small custom HTTP→SOCKS sidecar, built from `tor-proxy/`).
- **Hard dependencies on `mempool` and `tor`**, both pinned in `package.json` as `github:Start9Labs/<pkg>-startos#next` so their exported host-id/port consts can be imported. `main.ts` reaches Mempool's `webui` over the LXC bridge for the app's `/api` proxy (and derives a public-facing URL for the "View on local mempool" link), and resolves tor's SOCKS bridge address so the `tor-proxy` sidecar can route Chainalysis lookups through tor's SOCKS proxy. Both dial addresses go through `sdk.host.getBridgeAddress` (`.const()`), keyed by Mempool's `mainHostId`/`uiPort` and tor's `socksHostId`/`socksPort`; the external "View on mempool" URL is a separate `.const()` on Mempool's host that fires only when that browser-facing address changes.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach am-i-exposed -n main -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `main` or `tor-proxy`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
