#!/usr/bin/env python3
"""NyaaChat-Docs restart script (macmini side).

Single compose project -- pulls the latest docs image and restarts.

Principle: pull FIRST, then stop -- minimises client disconnection time.

Usage:
  python3 restart.py              # standard restart (pull -> down -> up -> prune)
  python3 restart.py --no-pull    # skip pull (restart with existing image)
"""

import argparse
import os
import subprocess
import sys
from pathlib import Path

PROJECT = "nyaachat-docs"
COMPOSE_FILE = "docker-compose.publish.yml"


def run(cmd: list[str]) -> subprocess.CompletedProcess:
    print(f"  -> {' '.join(cmd)}")
    return subprocess.run(cmd)


def ensure_network():
    """Create the shared external network if it does not exist (idempotent)."""
    cp = subprocess.run(
        ["docker", "network", "ls", "--filter", "name=^nyaachat-net$", "--format", "{{.Name}}"],
        capture_output=True, text=True,
    )
    if "nyaachat-net" not in cp.stdout:
        print("[0/5] Creating external network nyaachat-net...")
        run(["docker", "network", "create", "nyaachat-net"])
    else:
        print("[0/5] External network nyaachat-net already exists.")


def main():
    parser = argparse.ArgumentParser(description=f"Restart {PROJECT}")
    parser.add_argument("--no-pull", action="store_true", help="Skip docker compose pull")
    args = parser.parse_args()

    here = Path(__file__).resolve().parent
    os.chdir(here)

    # ---- 0. ensure network ----
    ensure_network()

    # ---- 1. pull first (minimise downtime) ----
    if not args.no_pull:
        print("[1/5] Pulling latest image...")
        cp = run(["docker", "compose", "-f", COMPOSE_FILE, "pull"])
        if cp.returncode != 0:
            print("[WARN] Pull failed, continuing with existing image...")
        else:
            print("Pull successful.")
    else:
        print("[1/5] Skipping pull (--no-pull).")

    # ---- 2. stop ----
    print("[2/5] Stopping compose project...")
    run(["docker", "compose", "-f", COMPOSE_FILE, "down"])

    # ---- 3. start ----
    print("[3/5] Starting compose project...")
    run(["docker", "compose", "-f", COMPOSE_FILE, "up", "-d"])

    # ---- 4. prune dangling images ----
    print("[4/5] Cleaning up dangling images...")
    run(["docker", "image", "prune", "-f"])

    # ---- 5. status report ----
    print(f"\n=== {PROJECT} status ===")
    run(["docker", "ps", "--filter", "name=nyaachat-docs",
         "--format", "table {{.Names}}\t{{.Status}}\t{{.Ports}}"])


if __name__ == "__main__":
    main()
