"""FastAPI entry point for the music recommendation engine."""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import search, recommend


@asynccontextmanager
async def lifespan(app: FastAPI):
    # TODO: load FAISS index, embeddings, and metadata at startup
    yield


app = FastAPI(title="Music Recommender API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search.router, prefix="/api")
app.include_router(recommend.router, prefix="/api")


@app.get("/api/health")
def health():
    return {"status": "ok"}
