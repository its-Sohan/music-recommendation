"""Recommendation route using cosine similarity."""
from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter()


class RecommendRequest(BaseModel):
    seed_ids: list[str] = Field(..., min_length=1, max_length=5)
    n_results: int = Field(default=20, ge=1, le=100)


class RecommendResponse(BaseModel):
    recommendations: list[dict]


@router.post("/recommend", response_model=RecommendResponse)
def recommend(request: RecommendRequest):
    # TODO: wire up FAISS + embeddings
    return {"recommendations": []}
