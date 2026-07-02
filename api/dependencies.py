"""Shared dependencies for the FastAPI app."""

from pathlib import Path

# Paths
ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
EMBEDDINGS_DIR = DATA_DIR / "embeddings"
PROCESSED_DIR = DATA_DIR / "processed"

EMBEDDINGS_PATH = EMBEDDINGS_DIR / "song_embeddings_normalized.npy"
FAISS_INDEX_PATH = EMBEDDINGS_DIR / "faiss_cosine.index"
SONG_ID_MAP_PATH = EMBEDDINGS_DIR / "song_id_map.json"
METADATA_PATH = PROCESSED_DIR / "songs_metadata.parquet"
