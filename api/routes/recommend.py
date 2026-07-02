"""Recommendation route using cosine similarity."""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class RecommendRequest(BaseModel):
    seed_ids: list[str]
    n_results: int = 20


class RecommendResponse(BaseModel):
    recommendations: list[dict]


@router.post("/recommend", response_model=RecommendResponse)
def recommend(request: RecommendRequest):
    # TODO: wire up FAISS + embeddings
    return {"recommendations": []}
