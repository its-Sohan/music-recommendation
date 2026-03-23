#!/bin/bash
set -e

echo "Setting up Music Recommendation Engine..."

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is required"
    exit 1
fi

# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Setup Node.js
export PATH="$(pwd)/.node/bin:$PATH"
cd ui
npm install
cd ..

# Setup pre-commit hooks
pre-commit install

echo "Setup complete! Run 'make dev' to start development."
