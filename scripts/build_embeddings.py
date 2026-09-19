"""Build song embeddings from metadata."""
import numpy as np
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent / "data"

def main():
    """Build normalized embeddings."""
    embeddings_dir = DATA_DIR / "embeddings"
    embeddings_dir.mkdir(parents=True, exist_ok=True)
    
    # Placeholder: generate random embeddings
    n_songs = 100
    embedding_dim = 64
    embeddings = np.random.randn(n_songs, embedding_dim).astype(np.float32)
    
    # Normalize
    norms = np.linalg.norm(embeddings, axis=1, keepdims=True)
    embeddings = embeddings / norms
    
    np.save(embeddings_dir / "song_embeddings_normalized.npy", embeddings)
    print(f"Saved embeddings: {embeddings.shape}")

if __name__ == "__main__":
    main()
