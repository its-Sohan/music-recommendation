# Music Recommendation Engine — Project Plan (Updated with Cosine Similarity)

## 1. The Big Picture (What Are We Actually Building?)

A web app where a user searches for songs, picks a handful they like, and the app returns songs that "fit" with their selection. No accounts, no history — just **seed songs → similar songs**.

This is **item-to-item recommendation** powered by learned embeddings + cosine similarity. Think of it as Spotify's "Song Radio" built from scratch.

---

## 2. The Math Layer — Explain to DUMB

### 2.1 The Core Idea: Songs Have Personality Scores

Forget genres. Forget BPM. Every song gets a set of numbers (like 50 of them) that describe its "personality." These numbers are learned automatically from who listens to what.

**Example:**
```
Song A (upbeat pop)     →  [0.9, 0.1, 0.8, 0.2, 0.5, ...]
Song B (chill acoustic) →  [0.2, 0.9, 0.1, 0.8, 0.3, ...]
Song C (upbeat dance)   →  [0.8, 0.2, 0.9, 0.1, 0.6, ...]
```
Song A and Song C are close → they get recommended together. 
Song A and Song B are far → they don't.

You don't hand-craft these numbers. You learn them from data.

### 2.2 How the Numbers Get Learned

You have a spreadsheet of who listened to what:

| User | Listened To |
|------|-------------|
| Alice | Song A, Song B, Song C |
| Bob   | Song A, Song C, Song D |
| Carol | Song B, Song D, Song E |

The computer starts with random numbers for every song and every user. Then it plays a guessing game millions of times:
- "Alice listened to Song A → their numbers should produce a HIGH score"
- "Alice did NOT listen to Song Z → their numbers should produce a LOW score"
- Nudge the numbers slightly to improve the guesses
- Repeat

After enough rounds, the numbers settle into a stable arrangement where songs that are often listened together by the same people get **similar numbers**.

PyTorch/`implicit` handles the nudging. You just set up the rules.

### 2.3 Why Cosine Similarity (The Must-Have)

Here's the trap: If you just use the raw dot product, **popular songs always win**.

Why? Because popular songs get big numbers during training (they interact with lots of users). So their dot product with anything is inflated.

**Cosine similarity fixes this.** Instead of raw dot product, you ask: *"What's the angle between these two songs?"*

```
cosine_similarity(A, B) = (A · B) / (|A| × |B|)
```

In plain English:
- `A · B` = multiply the numbers together and add them up (dot product)
- `|A|` = how "big" Song A's personality is (square root of sum of squares)
- `|B|` = how "big" Song B's personality is
- Divide the dot product by both sizes → you get a score between -1 and 1

**Why this matters:**
- A song with huge numbers (popular) and a song with small numbers (niche) can still have a cosine similarity of 1.0 if they point in the same direction.
- It measures **shape of taste**, not **volume of popularity**.

**Example:**
```
Song A (popular):  [100, 20, 80]     → |A| = 128
Song B (niche):    [1, 0.2, 0.8]     → |B| = 1.28
Song C (different):[10, 90, 5]       → |C| = 90.5

Dot product A·B = 128       → looks like A and B are super similar (wrong!)
Dot product A·C = 2740      → looks even more similar (very wrong!)

Cosine A·B = 128 / (128 × 1.28) = 0.78   → actually similar (correct!)
Cosine A·C = 2740 / (128 × 90.5) = 0.24  → not very similar (correct!)
```

**For your app:** Always use cosine similarity. Never raw dot product.

### 2.4 From Seed Songs to Recommendations

Your user picks 3 seed songs. You have their vectors.

**Step 1: Build a "taste vector"**
```
taste_vector = average(seed_song_1_vector, seed_song_2_vector, seed_song_3_vector)
```

**Step 2: Normalize the taste vector**
```
taste_vector = taste_vector / |taste_vector|
```
(Make it length 1, so cosine similarity works correctly)

**Step 3: Find the closest songs using cosine similarity**
For every song in the catalog:
```
similarity = (taste_vector · song_vector) / (|taste_vector| × |song_vector|)
```
Since you normalized taste_vector, this simplifies to:
```
similarity = taste_vector · song_vector / |song_vector|
```
Sort by similarity. Return the top 20.

**That's the entire math layer.** Average, normalize, dot product, divide by size.

### 2.5 Why This Beats "Genre Matching"

| Genre Matching | Embedding + Cosine Similarity |
|----------------|----------------------------|
| R&B → R&B | "Sad R&B" seeds → "Sad Acoustic" and "Melancholic Soul" because they share emotional shape, even if genres differ |
| Pop → Pop | "Upbeat K-Pop" seeds → "High-Energy EDM" because they share energy/danceability in the latent space |
| Static rules | Discovers connections humans wouldn't code (e.g., "lo-fi beats" and "rain sounds" cluster together for study sessions) |
| Popular songs dominate | Cosine similarity normalizes popularity out — niche songs can win if they match the taste shape |

---

## 3. Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        UI Layer (React/Vue)                    │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Search   │  │ Seed Basket  │  │ Recommendation Grid  │  │
│  │ Bar      │  │ (Selected    │  │ (Results)            │  │
│  │          │  │  Songs)      │  │                      │  │
│  └──────────┘  └──────────────┘  └──────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP POST /recommend
┌────────────────────────▼────────────────────────────────────┐
│                     API Layer (FastAPI)                      │
│  Receives seed IDs → loads vectors → averages → normalizes │
│  → computes COSINE similarities → returns top N song IDs     │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   Model Layer (Python/PyTorch)               │
│  ┌──────────────────┐  ┌────────────────────────────────┐ │
│  │ Embedding Matrix │  │  FAISS Index (Cosine ANN)        │ │
│  │ (Song ID → Vec)  │  │  Pre-built, fast similarity      │ │
│  └──────────────────┘  └────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                     Data Layer                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Song Metadata│  │ User-Item    │  │ Pre-computed     │   │
│  │ (titles,     │  │ Interactions │  │ Song Vectors     │   │
│  │  artists)    │  │ (plays)      │  │ (embeddings)     │   │
│  └──────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Tech Stack

| Layer | Tool | Why |
|-------|------|-----|
| **Frontend** | React + Tailwind | Search UI, seed basket, results grid |
| **Backend** | FastAPI | Lightweight, auto-docs, async |
| **Model Training** | `implicit` library (ALS) | 5 lines of code, learns embeddings from implicit feedback |
| **ANN Search** | FAISS with `IndexFlatIP` or `IndexFlat` + pre-normalized vectors | Fast cosine similarity search |
| **Data** | Pandas + Parquet | Fast I/O for millions of rows |
| **Dataset** | Last.fm-2K or Million Song Dataset (subset) | Public, free, real listening data |
| **Deployment** | Docker + Uvicorn | Containerize the API |

---

## 5. Data Flow


Data set I would like to use 

import kagglehub
path = kagglehub.dataset_download("undefinenull/million-song-dataset-spotify-lastfm")
print("Path to dataset files:", path)



### Training Phase (One-time, offline)
```
Raw Data (user, song, play_count)
    ↓
Filter: keep users with 20+ plays, songs with 50+ plays
    ↓
Build sparse matrix: rows = users, cols = songs, values = play counts
    ↓
Run ALS (Alternating Least Squares) → learns:
    - User embedding matrix (num_users × embedding_dim)
    - Song embedding matrix (num_songs × embedding_dim)
    ↓
Normalize all song vectors to unit length (for cosine similarity)
    ↓
Save normalized song embeddings to FAISS index + Parquet file
```

### Inference Phase (Real-time, per request)
```
User selects 3 seed songs (IDs: ["song_42", "song_88", "song_101"])
    ↓
Look up their vectors from FAISS/Parquet
    ↓
Average the vectors → taste_vector
    ↓
Normalize taste_vector to unit length
    ↓
FAISS.search(taste_vector, k=100) → returns 100 nearest song vectors
    ↓
Filter out seeds, deduplicate, rank by cosine similarity score
    ↓
Enrich with metadata (title, artist, album) from song catalog
    ↓
Return JSON to frontend
```

---

## 6. API Design

### `POST /search`
Search for songs by title/artist to populate the seed selector.

```json
// Request
{ "query": "bohemian rhapsody" }

// Response
{
  "results": [
    { "id": "song_42", "title": "Bohemian Rhapsody", "artist": "Queen" },
    { "id": "song_99", "title": "Somebody to Love", "artist": "Queen" }
  ]
}
```

### `POST /recommend`
The main endpoint. Uses **cosine similarity**.

```json
// Request
{
  "seed_ids": ["song_42", "song_88", "song_101"],
  "n_results": 20
}

// Response
{
  "recommendations": [
    { "id": "song_205", "title": "Don't Stop Me Now", "artist": "Queen", "similarity": 0.94 },
    { "id": "song_311", "title": "Under Pressure", "artist": "Queen", "similarity": 0.91 }
  ]
}
```

---

## 7. What You Actually Need to Code (The Cosine Similarity Parts)

### 7.1 Training (ALS + Normalization)

```python
from implicit.als import AlternatingLeastSquares
import numpy as np
import pandas as pd
from scipy.sparse import csr_matrix

# 1. Load your interaction data
plays = pd.read_parquet("user_song_plays.parquet")

# 2. Build sparse matrix
user_ids = plays['user_id'].astype('category')
song_ids = plays['song_id'].astype('category')
row = user_ids.cat.codes
col = song_ids.cat.codes
data = plays['play_count'].values

interaction_matrix = csr_matrix((data, (row, col)), 
                                 shape=(len(user_ids.cat.categories), 
                                        len(song_ids.cat.categories)))

# 3. Train ALS model
model = AlternatingLeastSquares(factors=50, regularization=0.01, iterations=20)
model.fit(interaction_matrix)

# 4. Extract song embeddings
song_embeddings = model.item_factors  # shape: (num_songs, 50)

# 5. CRITICAL: Normalize embeddings for cosine similarity
# Divide each vector by its length (L2 norm)
norms = np.linalg.norm(song_embeddings, axis=1, keepdims=True)
norms[norms == 0] = 1  # avoid division by zero
normalized_embeddings = song_embeddings / norms

# 6. Save
np.save("song_embeddings_normalized.npy", normalized_embeddings)
```

### 7.2 Building the FAISS Index (Cosine-Ready)

```python
import faiss
import numpy as np

# Load normalized embeddings
embeddings = np.load("song_embeddings_normalized.npy").astype('float32')

# Build FAISS index for cosine similarity
# Since vectors are already normalized, dot product = cosine similarity
dimension = embeddings.shape[1]  # 50
index = faiss.IndexFlatIP(dimension)  # IP = Inner Product (dot product)
index.add(embeddings)

# Save index
faiss.write_index(index, "faiss_cosine.index")

# Also save the mapping from FAISS index position to song ID
song_id_map = dict(enumerate(song_ids.cat.categories))
pd.Series(song_id_map).to_json("song_id_map.json")
```

### 7.3 Inference (Cosine Similarity in Action)

```python
import numpy as np
import faiss

# Load index and mappings
index = faiss.read_index("faiss_cosine.index")
song_id_map = pd.read_json("song_id_map.json", typ='series')
id_to_idx = {v: k for k, v in song_id_map.items()}
embeddings = np.load("song_embeddings_normalized.npy").astype('float32')

def recommend(seed_ids, n_results=20):
    # 1. Get seed vectors
    seed_vectors = np.array([embeddings[id_to_idx[sid]] for sid in seed_ids])

    # 2. Average them → taste vector
    taste_vector = np.mean(seed_vectors, axis=0)

    # 3. Normalize taste vector (CRITICAL for cosine similarity)
    taste_vector = taste_vector / np.linalg.norm(taste_vector)
    taste_vector = taste_vector.reshape(1, -1).astype('float32')

    # 4. Search FAISS (dot product on normalized vectors = cosine similarity)
    similarities, indices = index.search(taste_vector, k=n_results + len(seed_ids))

    # 5. Filter out the seed songs themselves
    results = []
    for sim, idx in zip(similarities[0], indices[0]):
        song_id = song_id_map[idx]
        if song_id not in seed_ids:
            results.append({
                "id": song_id,
                "similarity": float(sim)  # This IS cosine similarity (0 to 1)
            })
        if len(results) >= n_results:
            break

    return results
```

### 7.4 Why This Works (The Cosine Similarity Guarantee)

Because you:
1. **Normalized all song embeddings** during training → every song vector has length 1
2. **Normalized the taste vector** during inference → taste vector has length 1

The dot product of two unit-length vectors **is** cosine similarity:
```
cosine(A, B) = (A · B) / (|A| × |B|) = (A · B) / (1 × 1) = A · B
```

So `IndexFlatIP` (dot product) on normalized vectors gives you **pure cosine similarity** with zero extra math. FAISS is optimized for this and runs in milliseconds.

---

## 8. Project Milestones

| Phase | Task | Deliverable | Est. Time |
|-------|------|-------------|-----------|
| **1. Data** | Download Last.fm data, clean, filter, build interaction matrix | `interactions.parquet`, `songs_metadata.parquet` | 1 day |
| **2. Training** | Run ALS, normalize embeddings, build FAISS cosine index | `song_embeddings_normalized.npy`, `faiss_cosine.index` | 1 day |
| **3. API** | Build FastAPI with `/search` and `/recommend` (cosine similarity) | Working backend with tests | 2 days |
| **4. UI** | Build search + seed basket + results grid with similarity scores | React app talking to API | 2 days |
| **5. Polish** | Add loading states, empty states, similarity score bars, responsive | Portfolio-ready app | 1 day |
| **6. Deploy** | Dockerize, write README, record demo GIF | GitHub repo + live demo | 1 day |

**Total: ~8 days**

---

## 9. File Structure

```
music-recommender/
├── data/
│   ├── raw/                    # Downloaded Last.fm files
│   ├── processed/              # Cleaned parquet files
│   └── embeddings/             # song_embeddings_normalized.npy, faiss_cosine.index
├── model/
│   ├── train.py                # ALS training + normalization
│   ├── build_index.py          # FAISS cosine index builder
│   └── inference.py            # Cosine similarity recommendation
├── api/
│   ├── main.py                 # FastAPI app
│   ├── routes/
│   │   ├── search.py
│   │   └── recommend.py
│   └── dependencies.py         # FAISS index loader, embedding store
├── ui/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── SeedBasket.jsx
│   │   │   └── ResultsGrid.jsx
│   │   └── App.jsx
│   └── package.json
├── notebooks/
│   └── eda.ipynb               # Data exploration & sanity checks
├── Dockerfile
├── requirements.txt
└── README.md
```

---

## 10. The "Portfolio Pitch"

> *"I built a music recommendation engine that uses collaborative filtering to learn song embeddings from real listening behavior. Instead of hand-coded genre rules, the model discovers latent patterns — so 'Melancholic R&B' and 'Sad Acoustic' end up close together even though they're different genres. I use cosine similarity for retrieval, which normalizes out popularity bias so niche songs can compete with hits. When a user picks seed songs, I average their embedding vectors, normalize the result, and use FAISS to find the closest songs in milliseconds."*

**Key terms:**
- Collaborative filtering
- Latent embeddings
- Cosine similarity (popularity normalization)
- Approximate nearest neighbors (FAISS)
- Implicit feedback

---

## 11. What to Skip

| Don't Build | Why | Replacement |
|-------------|-----|-------------|
| User accounts / auth | Out of scope | Stateless, no login |
| Real-time training | Too complex | Pre-train offline, serve static embeddings |
| Audio CNNs | Needs GPUs, huge datasets | Collaborative filtering embeddings only |
| NeuMF / Transformers | Overkill, harder to explain | ALS embeddings are 90% as good, 10% of the code |
| A/B testing infrastructure | Not needed for demo | Show it works on example seeds |

---

## 12. The One-Line Summary

> **Learn song "personality scores" from listening history. Normalize them so popularity doesn't cheat. When the user picks seeds, average their scores, normalize again, and find the closest neighbors by angle, not by raw size.**

Everything else is plumbing.
