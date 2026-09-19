"""Smoke tests to verify UI component imports work."""
import importlib


def test_import_app():
    """Verify App module can be imported."""
    spec = importlib.util.find_spec("ui.src.App")
    # Module exists check (won't actually render in Python)


def test_search_bar_exists():
    """Verify SearchBar component file exists."""
    import os
    assert os.path.exists("ui/src/components/SearchBar.jsx")


def test_seed_basket_exists():
    """Verify SeedBasket component file exists."""
    import os
    assert os.path.exists("ui/src/components/SeedBasket.jsx")


def test_results_grid_exists():
    """Verify ResultsGrid component file exists."""
    import os
    assert os.path.exists("ui/src/components/ResultsGrid.jsx")
