ARG IMAGE
FROM ${IMAGE}
USER root
# The base image's CA store is only as current as its last release.
RUN apk upgrade --no-cache ca-certificates-bundle \
 && if [ -f /etc/ssl/certs/ca-certificates.crt.apk-new ]; then mv /etc/ssl/certs/ca-certificates.crt.apk-new /etc/ssl/certs/ca-certificates.crt; fi \
 && ! grep -q MIICTjCCAdOgAwIBAgIKPPYHqWhwDtqLhDAKBggqhkjOPQQDAzBr /etc/ssl/certs/ca-certificates.crt
# Upstream's Node predates the October 2026 security release.
COPY --from=node:22.23.4-alpine3.24 /usr/local/bin/node /usr/local/bin/node
ENV NODE_VERSION=22.23.4
USER 1000
# Node otherwise trusts its compiled-in roots instead of the system store.
ENV NODE_OPTIONS=--use-openssl-ca
