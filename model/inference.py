"""Inference utilities for cosine-similarity recommendations.

This module provides functions to load song embeddings and compute
recommendations based on seed tracks using FAISS nearest-neighbor search.
"""
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
EMBEDDINGS_DIR = ROOT / "data" / "embeddings"


def recommend(seed_ids, n_results=20):
    """Find similar songs using cosine similarity on embeddings.
    
    Args:
        seed_ids: List of song IDs to use as seeds.
        n_results: Number of recommendations to return.
    
    Returns:
        List of recommended songs with similarity scores.
    """
    raise NotImplementedError("TODO: implement recommendation logic")
