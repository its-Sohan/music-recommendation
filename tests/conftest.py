"""Shared test fixtures."""
import pytest
from fastapi.testclient import TestClient
from api.main import app


@pytest.fixture
def client():
    """Create a test client for the FastAPI app."""
    return TestClient(app)


@pytest.fixture
def sample_seed_ids():
    """Sample seed song IDs for testing."""
    return ["song_001", "song_002", "song_003"]


@pytest.fixture
def sample_query():
    """Sample search query for testing."""
    return "bohemian rhapsody"
