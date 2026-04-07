#!/usr/bin/env bash
set -euo pipefail

# Absolute path so cwd and paths with spaces work; avoid .venv/bin/pip and
# .venv/bin/uvicorn — their shebangs break when the project path contains spaces.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [[ -f .env ]]; then
  set -a
  # shellcheck source=/dev/null
  source .env
  set +a
fi

VENV_PY="$SCRIPT_DIR/.venv/bin/python"
if [[ ! -x "$VENV_PY" ]]; then
  python3 -m venv "$SCRIPT_DIR/.venv"
fi

"$VENV_PY" -m pip install -q -r requirements.txt

PORT="${PORT:-8000}"
exec "$VENV_PY" -m uvicorn app.main:app --reload --host 0.0.0.0 --port "$PORT"
