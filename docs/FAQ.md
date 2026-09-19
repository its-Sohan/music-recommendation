# Frequently Asked Questions

## General

### What is this project?
A music recommendation engine using collaborative filtering and cosine similarity.

### What tech stack is used?
- Backend: FastAPI + Python
- Frontend: React + Vite + Tailwind
- Model: ALS (implicit library)
- Search: FAISS

### How do I run tests?
```bash
make test
```

## Development

### Can I use Docker?
Yes! See the Dockerfile in the project root.

### How do I add new features?
1. Create a feature branch
2. Make changes
3. Add tests
4. Submit a PR

### Where is the data?
Data files are in `data/` directory. Raw data is gitignored.
