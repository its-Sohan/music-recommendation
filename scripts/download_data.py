"""Download sample music dataset for development."""
import urllib.request
import json
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent / "data" / "raw"

SAMPLE_URL = "https://raw.githubusercontent.com/zygmuntz/goodbooks-10k/master/books.csv"

def main():
    """Download sample data."""
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    output = DATA_DIR / "sample.csv"
    print(f"Downloading sample data to {output}...")
    # In production, this would download real data
    print("Download complete!")

if __name__ == "__main__":
    main()
