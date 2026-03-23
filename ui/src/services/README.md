# Services

This directory contains API client functions for communicating with the backend.

## Functions

| Function | Description |
|----------|-------------|
| `searchSongs(query)` | Search for songs by title/artist |
| `getRecommendations(seedIds, nResults)` | Get recommendations for seed songs |

## Configuration

API base URL is set to `/api` by default. Modify `API_BASE` in `api.js` to change.
