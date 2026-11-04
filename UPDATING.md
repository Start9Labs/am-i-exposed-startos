# Updating the upstream version

Am I Exposed? ships two upstream images: the analyzer (`ghcr.io/copexit/am-i-exposed-umbrel`) and its Tor proxy (`ghcr.io/copexit/am-i-exposed-tor-proxy`). Both use the same release tag, derived from `upstreamVersion` in `startos/utils.ts`.

## Determining the upstream version

**[Copexit/am-i-exposed](https://github.com/Copexit/am-i-exposed)** is the only upstream this package tracks. It publishes git tags, not GitHub Releases:

```sh
gh api repos/Copexit/am-i-exposed/tags --jq '.[].name'
```

Choose the newest stable tag whose **two** images are published for amd64 and arm64:

```sh
docker manifest inspect ghcr.io/copexit/am-i-exposed-umbrel:v<version>
docker manifest inspect ghcr.io/copexit/am-i-exposed-tor-proxy:v<version>
```

The current application pin is `upstreamVersion` in `startos/utils.ts`; `startos/manifest/index.ts` uses it for both image tags.

## Applying the bump

Update `upstreamVersion` in `startos/utils.ts` to the new upstream version; this updates both image pins.

Check upstream's `umbrel/nginx.conf.template` and `umbrel/tor-proxy/server.js` for changes to the environment and port contracts in `startos/main.ts`. The package passes Tor's bridge address as `TOR_PROXY_IP` and `TOR_PROXY_PORT`, and nginx forwards `/tor-proxy/` to that upstream sidecar.

The Tor daemon itself is supplied by the StartOS `tor` dependency, not either application image. Neither the upstream Node runtime nor this dependency's release is an upstream-version trigger for this package.
