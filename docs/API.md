# API Documentation

## Endpoints

### POST /api/search

Search for songs by title or artist.

**Request:**
```json
{
  "query": "bohemian rhapsody"
}
```

**Response:**
```json
{
  "results": [
    {
      "id": "song_001",
      "title": "Bohemian Rhapsody",
      "artist": "Queen"
    }
  ]
}
```

### POST /api/recommend

Get song recommendations based on seed tracks.

**Request:**
```json
{
  "seed_ids": ["song_001", "song_002"],
  "n_results": 20
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "id": "song_003",
      "title": "Another Song",
      "artist": "Artist",
      "similarity": 0.85
    }
  ]
}
```

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```
