#!/usr/bin/env bash
# Deploy AdityaVikramPortfolio v2 with Podman Compose
set -euo pipefail

# No /dev/net/tun on this host, so Buildah can't create isolated net
# namespaces for RUN steps. Build with chroot isolation on the host
# network stack instead.
export BUILDAH_ISOLATION=chroot

cd "$(dirname "$0")"

CONTAINER="portfolio"

echo "=== Building and starting $CONTAINER on 0.0.0.0:3000 (host network)..."
podman compose up -d --build

echo "=== Container started. Logs:"
podman logs "$CONTAINER" 2>&1 | tail -5
echo ""
echo "Visit: http://localhost:3000"
echo "Logs:  podman logs -f $CONTAINER"
echo "Stop:  podman compose down"
