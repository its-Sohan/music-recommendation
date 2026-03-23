"""Tests for the recommend API route."""
from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)


def test_recommend_empty_seeds():
    response = client.post("/api/recommend", json={"seed_ids": []})
    assert response.status_code == 422


def test_recommend_valid_seeds():
    response = client.post("/api/recommend", json={"seed_ids": ["1", "2"]})
    assert response.status_code == 200
    assert "recommendations" in response.json()


def test_recommend_too_many_seeds():
    seeds = [str(i) for i in range(6)]
    response = client.post("/api/recommend", json={"seed_ids": seeds})
    assert response.status_code == 422


def test_recommend_custom_n_results():
    response = client.post("/api/recommend", json={"seed_ids": ["1"], "n_results": 10})
    assert response.status_code == 200
