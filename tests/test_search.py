"""Tests for the search API route."""
from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)


def test_search_empty_query():
    response = client.post("/api/search", json={"query": ""})
    assert response.status_code == 422


def test_search_valid_query():
    response = client.post("/api/search", json={"query": "test"})
    assert response.status_code == 200
    assert "results" in response.json()


def test_search_long_query():
    long_query = "a" * 201
    response = client.post("/api/search", json={"query": long_query})
    assert response.status_code == 422


def test_search_returns_list():
    response = client.post("/api/search", json={"query": "bohemian"})
    assert isinstance(response.json()["results"], list)
