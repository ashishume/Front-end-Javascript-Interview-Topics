import logging
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from app.db import close_pool, create_pool
from app.routes import chats

logger = logging.getLogger(__name__)



@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.db_pool = await create_pool()
    if app.state.db_pool:
        try:
            async with app.state.db_pool.acquire() as conn:
                await conn.fetchval("SELECT 1")
        except Exception:  # noqa: BLE001
            logger.exception("Database connection failed at startup")
        else:
            logger.info("Database connected successfully")
            print("Database connected successfully")
    else:
        logger.info("Database not configured (set DATABASE_URL or PGUSER + PGDATABASE)")
        print("Database pool: not configured")
    try:
        yield
    finally:
        await close_pool(app.state.db_pool)
        app.state.db_pool = None


app = FastAPI(title="Python Postgres API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/db/health")
async def db_health(request: Request):
    pool = request.app.state.db_pool
    if not pool:
        raise HTTPException(
            status_code=503,
            detail="Database not configured (set DATABASE_URL or PGUSER + PGDATABASE)",
        )
    try:
        async with pool.acquire() as conn:
            value = await conn.fetchval("SELECT 1")
    except Exception as exc:  # noqa: BLE001
        logger.exception("Database health check failed")
        raise HTTPException(status_code=503, detail="Database unreachable") from exc
    return {"status": "ok", "database": "connected", "check": value}


@app.get("/")
async def root():
    return {
        "service": "python-backend",
        "docs": "/docs",
        "health": "/health",
        "db_health": "/db/health",
    }

app.include_router(chats.router, prefix="/chats", tags=["chats"])


def main():
    import uvicorn

    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)


if __name__ == "__main__":
    main()
