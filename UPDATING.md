# Updating the upstream version

Am I Exposed? ships two images: the upstream analyzer (`ghcr.io/copexit/am-i-exposed-umbrel`, a pinned `dockerTag` in the manifest) and a small bundled Tor proxy built locally from `tor-proxy/` via `dockerBuild` (no pinned tag).

## Determining the upstream version

- **Analyzer — [Copexit/am-i-exposed](https://github.com/Copexit/am-i-exposed)** (git tags, no GitHub Releases):

  ```sh
  gh api repos/Copexit/am-i-exposed/tags --jq '.[0].name'
  ```

  Current pin lives in `startos/manifest/index.ts` on the `images.main.source.dockerTag` line (`ghcr.io/copexit/am-i-exposed-umbrel:v<version>`). Each upstream tag `vX.Y.Z` is published to GHCR with the matching `:vX.Y.Z` tag.

- **Tor proxy base image — [`library/node`](https://hub.docker.com/_/node) on Docker Hub.** `tor-proxy/Dockerfile` builds `FROM node:<major>-alpine`; there is no Tor binary or Debian package in this image (the proxy is a Node.js socks helper using `socks-proxy-agent`, and the daemon Tor is supplied by the `tor` dependency). The only upstream to track here is the Node base. To list recent `node:22-alpine` variants:

  ```sh
  curl -fsSL "https://hub.docker.com/v2/repositories/library/node/tags?page_size=20&ordering=last_updated" \
    | jq -r '.results[].name' | grep -E '^22(\.[0-9]+){0,2}-alpine$'
  ```

  Current pin lives in `tor-proxy/Dockerfile` on the `FROM` line. The `socks-proxy-agent` dependency is tracked via `tor-proxy/package.json` and `npm update`, not here.

## Applying the bump

- **Analyzer:** bump `dockerTag` for the `main` image in `startos/manifest/index.ts` to `ghcr.io/copexit/am-i-exposed-umbrel:v<new version>`.
- **Tor proxy:** if the Node base needs a bump (e.g. moving major versions), edit the `FROM` line in `tor-proxy/Dockerfile`. Routine `socks-proxy-agent` updates go through `npm update` inside `tor-proxy/`, not this file.
