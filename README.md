# Music Recommendation Engine

A web app where users search for songs, pick a few seed tracks, and get recommendations powered by collaborative filtering + cosine similarity.

## Tech Stack

- **Frontend:** React + Vite + Tailwind
- **Backend:** FastAPI + Uvicorn
- **Model:** ALS (`implicit`) for learning song embeddings
- **Search:** FAISS with cosine similarity
- **Data:** Pandas + Parquet

## Project Structure

```
music-recommendation/
├── api/                  # FastAPI app
├── model/                # Training + index + inference scripts
├── ui/                   # React frontend
├── data/                 # Raw, processed, and embedding data
├── notebooks/            # EDA notebooks
├── requirements.txt
└── README.md
```

## Setup

### Python environment

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
```

### Node.js (local binary)

A local Node binary is installed in `.node/`. To use it, prepend it to your PATH:

```bash
export PATH="$(pwd)/.node/bin:$PATH"
cd ui
npm install
npm run dev
```

### Run the API

```bash
.venv/bin/python -m uvicorn api.main:app --reload
```

The API will be available at `http://localhost:8000`.

### Run the UI

```bash
export PATH="$(pwd)/.node/bin:$PATH"
cd ui
npm run dev
```

The UI will be available at `http://localhost:5173`.

## Development Status

- [x] Phase 0: Project scaffold
- [ ] Phase 1: Data pipeline
- [ ] Phase 2: Model training
- [ ] Phase 3: FAISS index
- [ ] Phase 4: API implementation
- [ ] Phase 5: UI implementation
- [ ] Phase 6: Polish & deployment
