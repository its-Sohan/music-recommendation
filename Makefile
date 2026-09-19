.PHONY: api ui install test clean lint format help dev typecheck

export PATH := $(shell pwd)/.node/bin:$(PATH)

install:
	python3 -m venv .venv
	.venv/bin/pip install -r requirements.txt
	cd ui && npm install

api:
	.venv/bin/python -m uvicorn api.main:app --reload

ui:
	cd ui && npm run dev

dev:
	.venv/bin/python -m uvicorn api.main:app --reload &
	cd ui && npm run dev

test:
	.venv/bin/pytest

lint:
	.venv/bin/flake8 api/ model/ tests/
	cd ui && npm run lint

typecheck:
	.venv/bin/mypy api/ model/

format:
	.venv/bin/black api/ model/ tests/
	cd ui && npx prettier --write "src/**/*.{js,jsx}"

clean:
	rm -rf .venv .node ui/node_modules ui/dist
	find . -type d -name __pycache__ -exec rm -rf {} +

help:
	@echo "Available targets:"
	@echo "  install   - Install dependencies"
	@echo "  api       - Run FastAPI server"
	@echo "  ui        - Run React dev server"
	@echo "  dev       - Run both API and UI"
	@echo "  test      - Run tests"
	@echo "  lint      - Run linters"
	@echo "  typecheck - Run type checking"
	@echo "  format    - Auto-format code"
	@echo "  clean     - Remove build artifacts"
