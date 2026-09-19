"""Generate sample data for development."""
import json
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
SAMPLE_SONGS = [
    {"id": "1", "title": "Bohemian Rhapsody", "artist": "Queen", "album": "A Night at the Opera"},
    {"id": "2", "title": "Stairway to Heaven", "artist": "Led Zeppelin", "album": "Led Zeppelin IV"},
    {"id": "3", "title": "Hotel California", "artist": "Eagles", "album": "Hotel California"},
    {"id": "4", "title": "Imagine", "artist": "John Lennon", "album": "Imagine"},
    {"id": "5", "title": "Smells Like Teen Spirit", "artist": "Nirvana", "album": "Nevermind"},
]

def main():
    """Create sample songs metadata."""
    output_path = DATA_DIR / "processed" / "sample_songs.json"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(SAMPLE_SONGS, f, indent=2)
    print(f"Created {output_path}")

if __name__ == "__main__":
    main()
