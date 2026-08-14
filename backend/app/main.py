from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from contextlib import asynccontextmanager

from .database import init_db, ensure_seeded
from .routers import user, course


def _get_cors_origins() -> list[str]:
    raw = os.getenv("FRONTEND_URL", "")
    origins = [o.strip() for o in raw.split(",") if o.strip()]
    if not origins:
        origins = [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:8000",
            "http://127.0.0.1:8000",
        ]
    return origins


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    ensure_seeded()
    yield


app = FastAPI(title="Duolingo Clone API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=_get_cors_origins() + ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


app.include_router(user.router, prefix="/api/user", tags=["User"])
app.include_router(course.router, prefix="/api/course", tags=["Course"])
