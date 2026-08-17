# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **`tor-proxy/` is a first-party sidecar, not a Tor build.** It is a Node HTTP-to-SOCKS shim (`socks-proxy-agent`); the Tor daemon itself is the `tor` dependency.
- **`APP_MEMPOOL_EXTERNAL_URL` must be browser-reachable, not container-reachable.** It backs the "view on local mempool" links, so it is resolved from Mempool's public/mDNS addresses rather than from its bridge address, on its own `.const()` so a Mempool update does not restart this service. Don't collapse it into the bridge address used for `/api`.
