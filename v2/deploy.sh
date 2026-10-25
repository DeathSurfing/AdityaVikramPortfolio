#!/usr/bin/env bash
# Deploy AdityaVikramPortfolio v2 with Podman Compose
set -euo pipefail

# No /dev/net/tun on this host, so Buildah can't create isolated net
# namespaces for RUN steps. Build with chroot isolation on the host
# network stack instead.
export BUILDAH_ISOLATION=chroot

cd "$(dirname "$0")"

CONTAINER="portfolio"
SIDECAR="portfolio-watchtower"

ARGS=(-f compose.yaml)
if [ "${WATCHTOWER_ENABLED:-true}" = "true" ]; then
  : "${WATCHTOWER_REPO_DIR:=/root/AdityaVikramPortfolio}"
  export WATCHTOWER_REPO_DIR
  ARGS+=(-f compose.watchtower.yaml)
  echo "=== Source watchtower enabled (repo: $WATCHTOWER_REPO_DIR, polls origin/main)."
else
  echo "=== Source watchtower disabled (WATCHTOWER_ENABLED=false)."
fi

echo "=== Building and starting $CONTAINER on 0.0.0.0:3000 (host network)..."
podman compose "${ARGS[@]}" up -d --build

echo "=== Waiting for :3000 ..."
for i in $(seq 1 30); do
  if curl -fs -o /dev/null http://localhost:3000/; then
    echo "=== Up after ${i}s."
    break
  fi
  sleep 2
  if [ "$i" = "30" ]; then
    echo "=== Still not responding after 60s. Recent logs:"
    podman logs "$CONTAINER" 2>&1 | tail -20
    exit 1
  fi
done

echo "=== portfolio logs:"
podman logs "$CONTAINER" 2>&1 | tail -5
echo ""
if [ "${WATCHTOWER_ENABLED:-true}" = "true" ]; then
  echo "=== watchtower logs:"
  podman logs "$SIDECAR" 2>&1 | tail -5 || true
  echo ""
fi
echo "Pushes to main rebuild automatically from source (no registry)."
echo "Logs:  podman logs -f $CONTAINER"
echo "Watch: podman logs -f $SIDECAR"
echo "Stop:  podman compose down"
echo ""
echo ""
echo "Pushes to main rebuild automatically from source (no registry)."
echo "Visit: http://localhost:3000"
echo "Logs:  podman logs -f $CONTAINER"
echo "Watch: podman logs -f portfolio-watchtower"
echo "Stop:  podman compose down"
