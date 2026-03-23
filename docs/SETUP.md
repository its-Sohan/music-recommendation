# Development Setup

## Prerequisites

- Python 3.10+
- Node.js 18+
- Git

## Quick Start

```bash
# Clone repository
git clone https://github.com/its-Sohan/music-recommendation.git
cd music-recommendation

# Install dependencies
make install

# Start development servers
make dev
```

## Manual Setup

### Python Environment

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Node.js Setup

```bash
export PATH="$(pwd)/.node/bin:$PATH"
cd ui
npm install
```

## IDE Setup

### VS Code

Install extensions:
- Python
- ESLint
- Prettier
