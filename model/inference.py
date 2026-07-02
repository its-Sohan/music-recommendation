"""Inference utilities for cosine-similarity recommendations."""

from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
EMBEDDINGS_DIR = ROOT / "data" / "embeddings"


def recommend(seed_ids, n_results=20):
    raise NotImplementedError("TODO: implement recommendation logic")
