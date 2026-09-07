# Updating the upstream version

Am I Exposed? ships two images: the upstream analyzer (`ghcr.io/copexit/am-i-exposed-umbrel`, a pinned `dockerTag` in the manifest) and a small bundled Tor proxy built locally from `tor-proxy/` via `dockerBuild` (no pinned tag).

## Determining the upstream version

**[Copexit/am-i-exposed](https://github.com/Copexit/am-i-exposed)** is the only upstream this package tracks. It publishes git tags, not GitHub Releases:

```sh
gh api repos/Copexit/am-i-exposed/tags --jq '.[0].name'
```

The current pin lives in `startos/manifest/index.ts` on the `images.main.source.dockerTag` line (`ghcr.io/copexit/am-i-exposed-umbrel:v<version>`). Each upstream tag `vX.Y.Z` is published to GHCR with the matching `:vX.Y.Z` tag.

## Applying the bump

Bump `dockerTag` for the `main` image in `startos/manifest/index.ts` to `ghcr.io/copexit/am-i-exposed-umbrel:v<new version>`.

## The Tor proxy's Node base is maintenance, not a release trigger

`tor-proxy/` is a first-party sidecar — a Node.js HTTP-to-SOCKS shim built on `socks-proxy-agent`, with the Tor daemon itself supplied by the `tor` dependency. Its `node:<major>-alpine` base is a runtime, not a delivery vehicle for any upstream software, so **a newer Node release is not an upstream update and never ships a version of its own.** Roll the base forward only alongside a bump or a fix that is already shipping.

Move the major only once the pinned line leaves [LTS maintenance](https://github.com/nodejs/release#release-schedule). The pin is the `FROM` line in `tor-proxy/Dockerfile`; to list the alpine variants Docker Hub currently carries for it:

```sh
NODE_MAJOR=$(grep -oP '(?<=^FROM node:)[0-9]+' tor-proxy/Dockerfile)
curl -fsSL "https://hub.docker.com/v2/repositories/library/node/tags?name=${NODE_MAJOR}&page_size=100&ordering=last_updated" \
  | jq -r '.results[].name' | grep -E "^${NODE_MAJOR}(\.[0-9]+){0,2}-alpine$"
```

`socks-proxy-agent` is tracked via `tor-proxy/package.json` and `npm update`, not here.
