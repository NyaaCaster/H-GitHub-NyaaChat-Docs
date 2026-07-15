#!/usr/bin/env python3
"""NyaaChat-Docs: sync latest docs from GitHub and restart container.

Place on macmini at /root/DockerContainer/NyaaChat-Docs/sync-docs.py

Usage:
  python3 sync-docs.py              # git pull + cp + docker restart
  python3 sync-docs.py --no-restart # git pull + cp only, skip restart
"""

import argparse
import os
import subprocess
import sys
from pathlib import Path

REPO_DIR = "/root/DockerContainer/NyaaChat-Docs/repo"
DOCS_DIR = "/root/DockerContainer/NyaaChat-Docs/doc-files"
COMPOSE_FILE = "/root/DockerContainer/NyaaChat-Docs/docker-compose.yml"


def run(cmd: list[str]) -> None:
    print(f"  -> {' '.join(cmd)}")
    subprocess.run(cmd, check=True)


def main() -> None:
    parser = argparse.ArgumentParser(description="Sync NyaaChat-Docs from GitHub")
    parser.add_argument("--no-restart", action="store_true", help="Skip docker restart")
    args = parser.parse_args()

    os.chdir(Path(__file__).resolve().parent)

    print("=== NyaaChat-Docs sync ===")

    # 1. Pull latest from GitHub
    print("[1/3] git pull...")
    run(["git", "-C", REPO_DIR, "pull", "origin", "master"])

    # 2. Copy docs into bind mount
    print("[2/3] cp doc-files -> bind mount...")
    run(["cp", "-r", f"{REPO_DIR}/doc-files/", DOCS_DIR])

    # 3. Restart container (unless --no-restart)
    if args.no_restart:
        print("[3/3] skip restart (--no-restart)")
    else:
        print("[3/3] docker restart...")
        run(["docker", "compose", "-f", COMPOSE_FILE, "restart"])

    print("=== done ===")
    subprocess.run(["git", "-C", REPO_DIR, "log", "--oneline", "-3"])


if __name__ == "__main__":
    main()
