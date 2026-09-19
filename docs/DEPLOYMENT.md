# Deployment Guide

## Docker Deployment

```bash
# Build and run
docker-compose up --build

# Or build individually
docker build -t music-recommender-api .
docker run -p 8000:8000 music-recommender-api
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| API_HOST | API bind host | 0.0.0.0 |
| API_PORT | API port | 8000 |
| DEBUG | Debug mode | false |

## Production Checklist

- [ ] Set DEBUG=false
- [ ] Configure CORS origins
- [ ] Set up SSL/TLS
- [ ] Configure logging
- [ ] Set up monitoring
