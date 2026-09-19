"""Tests for the FastAPI application."""
from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)


def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_search_returns_empty():
    response = client.post("/api/search", json={"query": "test"})
    assert response.status_code == 200
    assert response.json() == {"results": []}


def test_recommend_returns_empty():
    response = client.post("/api/recommend", json={"seed_ids": ["1", "2"]})
    assert response.status_code == 200
    assert response.json() == {"recommendations": []}
