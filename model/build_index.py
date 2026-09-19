"""Build a FAISS cosine index from normalized embeddings.

This module loads precomputed song embeddings, normalizes them,
and builds a FAISS inner-product index for fast similarity search.
"""
from pathlib import Path

import faiss
import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
EMBEDDINGS_DIR = ROOT / "data" / "embeddings"


def build_index():
    """Build and save FAISS cosine similarity index from embeddings.
    
    Loads normalized embeddings, creates a FAISS inner-product index,
    and saves it to disk for fast nearest-neighbor queries.
    """
    raise NotImplementedError("TODO: implement FAISS index build")


if __name__ == "__main__":
    build_index()
