# Testing Guide

## Running Tests

```bash
# Run all tests
make test

# Run with verbose output
.venv/bin/pytest -v

# Run specific test file
.venv/bin/pytest tests/test_api.py
```

## Writing Tests

### API Tests
```python
def test_health(client):
    response = client.get("/api/health")
    assert response.status_code == 200
```

### Model Tests
```python
def test_recommend():
    with pytest.raises(NotImplementedError):
        recommend(["1", "2"])
```

## Test Structure

- `test_api.py` - API endpoint tests
- `test_model.py` - Model function tests
- `test_search.py` - Search-specific tests
- `test_recommend.py` - Recommend-specific tests
