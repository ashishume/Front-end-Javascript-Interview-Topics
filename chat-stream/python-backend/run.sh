#!/usr/bin/env bash
set -euo pipefail

# Default listen port (updated in-place by this script when the port is busy and
# PORT was not set via environment or .env).
DEFAULT_LISTEN_PORT=8001

# Absolute path so cwd and paths with spaces work; avoid .venv/bin/pip and
# .venv/bin/uvicorn — their shebangs break when the project path contains spaces.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Set if PORT is explicitly provided (shell env or .env); then we do not rewrite run.sh.
EXPLICIT_PORT=
[[ -n "${PORT:-}" ]] && EXPLICIT_PORT=1

if [[ -f .env ]]; then
  set -a
  # shellcheck source=/dev/null
  source .env
  set +a
fi

[[ -n "${PORT:-}" ]] && EXPLICIT_PORT=1

START_PORT="${PORT:-$DEFAULT_LISTEN_PORT}"
PORT=$START_PORT

# True if nothing is listening on 0.0.0.0:port (stdlib only; works before venv).
port_in_use() {
  local p=$1
  ! python3 -c "import socket; s=socket.socket(socket.AF_INET, socket.SOCK_STREAM); s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1); s.bind(('0.0.0.0', int('${p}')))" 2>/dev/null
}

while port_in_use "$PORT"; do
  PORT=$((PORT + 1))
  if [[ "$PORT" -gt 65535 ]]; then
    echo "run.sh: no free TCP port found starting from ${START_PORT}" >&2
    exit 1
  fi
done

if [[ "$PORT" != "$START_PORT" ]] && [[ -z "${EXPLICIT_PORT:-}" ]]; then
  RUN_SH="$SCRIPT_DIR/run.sh"
  if [[ "$(uname -s)" == "Darwin" ]]; then
    sed -i '' "s/^DEFAULT_LISTEN_PORT=.*/DEFAULT_LISTEN_PORT=${PORT}/" "$RUN_SH"
  else
    sed -i "s/^DEFAULT_LISTEN_PORT=.*/DEFAULT_LISTEN_PORT=${PORT}/" "$RUN_SH"
  fi
  echo "run.sh: port ${START_PORT} was in use; using ${PORT} and set DEFAULT_LISTEN_PORT=${PORT} in run.sh" >&2
fi

VENV_PY="$SCRIPT_DIR/.venv/bin/python"
if [[ ! -x "$VENV_PY" ]]; then
  python3 -m venv "$SCRIPT_DIR/.venv"
fi

"$VENV_PY" -m pip install -q -r requirements.txt

exec "$VENV_PY" -m uvicorn app.main:app --reload --host 0.0.0.0 --port "$PORT"
