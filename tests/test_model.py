"""Tests for model training and inference."""
import pytest


def test_load_interactions():
    """Test that interaction loading raises NotImplementedError."""
    from model.train import load_interactions
    with pytest.raises(NotImplementedError):
        load_interactions()


def test_train():
    """Test that training raises NotImplementedError."""
    from model.train import train
    with pytest.raises(NotImplementedError):
        train()


def test_recommend():
    """Test that recommendation raises NotImplementedError."""
    from model.inference import recommend
    with pytest.raises(NotImplementedError):
        recommend(["1", "2"])


def test_build_index():
    """Test that index building raises NotImplementedError."""
    from model.build_index import build_index
    with pytest.raises(NotImplementedError):
        build_index()
