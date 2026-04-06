import os
from typing import Any

import asyncpg
from dotenv import load_dotenv

load_dotenv()


def _pool_config() -> dict[str, Any] | None:
    database_url = os.getenv("DATABASE_URL", "").strip()
    if database_url:
        return {"dsn": database_url}

    database = os.getenv("PGDATABASE", "").strip()
    user = os.getenv("PGUSER", "").strip()
    if not database or not user:
        return None

    password = os.getenv("PGPASSWORD", "")
    cfg: dict[str, Any] = {
        "host": os.getenv("PGHOST", "localhost"),
        "port": int(os.getenv("PGPORT", "5432")),
        "user": user,
        "database": database,
    }
    if password:
        cfg["password"] = password
    return cfg


async def create_pool() -> asyncpg.Pool | None:
    cfg = _pool_config()
    if not cfg:
        return None
    return await asyncpg.create_pool(min_size=1, max_size=10, **cfg)


async def close_pool(pool: asyncpg.Pool | None) -> None:
    if pool:
        await pool.close()
