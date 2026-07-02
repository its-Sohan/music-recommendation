"""Build a FAISS cosine index from normalized embeddings."""

from pathlib import Path

import faiss
import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
EMBEDDINGS_DIR = ROOT / "data" / "embeddings"


def build_index():
    raise NotImplementedError("TODO: implement FAISS index build")


if __name__ == "__main__":
    build_index()
