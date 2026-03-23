# Architecture Overview

## System Components

```
┌─────────┐     ┌─────────┐     ┌─────────┐
│   UI    │────▶│   API   │────▶│  Model  │
│ React   │     │ FastAPI │     │  FAISS  │
└─────────┘     └─────────┘     └─────────┘
                      │
                      ▼
                 ┌─────────┐
                 │  Data   │
                 │ Parquet │
                 └─────────┘
```

## Data Flow

1. User searches songs via UI
2. API queries metadata parquet
3. User selects seed songs
4. API loads embeddings from FAISS index
5. Cosine similarity computed
6. Results returned to UI

## Model Pipeline

1. Raw data → Processing → Parquet
2. Parquet → ALS Training → Embeddings
3. Embeddings → FAISS Index
