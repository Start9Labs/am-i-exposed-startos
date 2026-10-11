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

The current application pin is `upstreamVersion` in `startos/utils.ts`; `startos/manifest/index.ts` uses it for both image tags. Preserve every upstream version component in the StartOS version in `startos/versions/current.ts`.

## Applying the bump

Update `upstreamVersion` in `startos/utils.ts` to the new upstream version. This updates both image pins and the upstream portion of the current StartOS version; reset its downstream revision to `:0` and update its localized release notes according to the packaging guide.

For the scrutiny tier required by the guide, check upstream's `umbrel/nginx.conf.template` and `umbrel/tor-proxy/server.js` for changes to the environment and port contracts in `startos/main.ts`. The package passes Tor's bridge address as `TOR_PROXY_IP` and `TOR_PROXY_PORT`, and nginx forwards `/tor-proxy/` to that upstream sidecar. Its service routes and registry ship in the upstream image — do not maintain a second routing implementation here.

The Tor daemon itself is supplied by the StartOS `tor` dependency, not either application image. Neither the upstream Node runtime nor this dependency's release is an upstream-version trigger for this package.
