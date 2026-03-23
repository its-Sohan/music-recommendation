"""Train ALS model and save normalized song embeddings.

This module uses the implicit library to train an Alternating Least Squares
model on user-song interaction data, producing embeddings for recommendation.
"""
from pathlib import Path

import numpy as np
import pandas as pd
from implicit.als import AlternatingLeastSquares
from scipy.sparse import csr_matrix

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
PROCESSED_DIR = DATA_DIR / "processed"
EMBEDDINGS_DIR = DATA_DIR / "embeddings"


def load_interactions():
    """Load user-song interaction matrix from processed data."""
    raise NotImplementedError("TODO: implement interaction loading")


def train():
    """Train ALS model and save normalized song embeddings."""
    raise NotImplementedError("TODO: implement ALS training")


if __name__ == "__main__":
    train()
