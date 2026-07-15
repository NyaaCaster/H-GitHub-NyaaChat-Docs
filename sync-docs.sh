#!/bin/bash
# NyaaChat-Docs: sync latest docs from GitHub and restart container.
# Usage: bash sync-docs.sh [--no-restart]
#
# Place on macmini at /root/DockerContainer/NyaaChat-Docs/sync-docs.sh

set -e

REPO_DIR="/root/DockerContainer/NyaaChat-Docs/repo"
DOCS_DIR="/root/DockerContainer/NyaaChat-Docs/doc-files"
COMPOSE_FILE="/root/DockerContainer/NyaaChat-Docs/docker-compose.yml"

NO_RESTART=false
if [ "$1" = "--no-restart" ]; then
    NO_RESTART=true
fi

echo "=== NyaaChat-Docs sync ==="

# 1. Pull latest from GitHub
echo "[1/3] git pull..."
cd "$REPO_DIR"
git pull origin master

# 2. Copy docs into bind mount
echo "[2/3] cp doc-files -> bind mount..."
cp -r doc-files/* "$DOCS_DIR/"

# 3. Restart container (unless --no-restart)
if $NO_RESTART; then
    echo "[3/3] skip restart (--no-restart)"
else
    echo "[3/3] docker restart..."
    cd /root/DockerContainer/NyaaChat-Docs
    docker compose -f "$COMPOSE_FILE" restart
fi

echo "=== done ==="
git log --oneline -3
