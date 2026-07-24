#!/usr/bin/env bash
# Deploy AdityaVikramPortfolio v2 with Podman
# Uses host networking to avoid slirp4netns /dev/net/tun requirement.
set -euo pipefail

cd "$(dirname "$0")"

IMAGE="aditya-portfolio"
CONTAINER="aditya-portfolio"

echo "=== Building $IMAGE..."
podman build --network host -t "$IMAGE" .

echo "=== Stopping & removing old container (if any)..."
podman rm -f "$CONTAINER" 2>/dev/null || true

echo "=== Starting $CONTAINER on port 3000..."
podman run -d \
  --network host \
  --name "$CONTAINER" \
  --restart unless-stopped \
  --env-file .env \
  "$IMAGE"

echo "=== Container started. Logs:"
podman logs "$CONTAINER" 2>&1 | tail -5
echo ""
echo "Visit: http://localhost:3000"
echo "Logs:  podman logs -f $CONTAINER"
