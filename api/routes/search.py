"""Search route for finding songs by title/artist."""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class SearchRequest(BaseModel):
    query: str


class SearchResponse(BaseModel):
    results: list[dict]


@router.post("/search", response_model=SearchResponse)
def search(request: SearchRequest):
    # TODO: wire up metadata parquet
    return {"results": []}
