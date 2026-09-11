#!/usr/bin/env bash
set -euo pipefail

guard_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)

git diff --no-renames --relative --name-only "$1...$2" -- . |
  node "$guard_directory/protected_file_guard.js"
