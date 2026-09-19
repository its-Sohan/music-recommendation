"""Search route for finding songs by title/artist."""
from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter()


class SearchRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=200, description="Search query")


class SearchResponse(BaseModel):
    results: list[dict]


@router.post("/search", response_model=SearchResponse)
def search(request: SearchRequest):
    # TODO: wire up metadata parquet
    return {"results": []}
