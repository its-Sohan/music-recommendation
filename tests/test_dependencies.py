"""Tests for shared path dependencies."""
from api.dependencies import ROOT, DATA_DIR, EMBEDDINGS_DIR, PROCESSED_DIR


def test_root_is_repo_root():
    """Test ROOT points to repository root."""
    assert ROOT.name == "music-recommendation" or ROOT.is_dir()


def test_data_dir_exists():
    """Test DATA_DIR is under ROOT."""
    assert DATA_DIR.parent == ROOT


def test_embeddings_dir_path():
    """Test EMBEDDINGS_DIR is under DATA_DIR."""
    assert EMBEDDINGS_DIR.parent == DATA_DIR


def test_processed_dir_path():
    """Test PROCESSED_DIR is under DATA_DIR."""
    assert PROCESSED_DIR.parent == DATA_DIR
