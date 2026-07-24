#!/usr/bin/env bash
# Deploy AdityaVikramPortfolio v2 with Podman
set -euo pipefail

cd "$(dirname "$0")"

IMAGE="portfolio"
CONTAINER="portfolio"

echo "=== Building $IMAGE..."
podman build --network=host -t "$IMAGE" .

echo "=== Starting $CONTAINER on port 3000..."
podman run -d \
  --replace \
  --name "$CONTAINER" \
  -p 3000:3000 \
  --env-file .env \
  "$IMAGE"

echo "=== Container started. Logs:"
podman logs "$CONTAINER" 2>&1 | tail -5
echo ""
echo "Visit: http://localhost:3000"
echo "Logs:  podman logs -f $CONTAINER"
echo "Stop:  podman stop $CONTAINER"
