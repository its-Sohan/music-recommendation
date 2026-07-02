.PHONY: api ui install test clean

export PATH := $(shell pwd)/.node/bin:$(PATH)

install:
	python3 -m venv .venv
	.venv/bin/pip install -r requirements.txt
	cd ui && npm install

api:
	.venv/bin/python -m uvicorn api.main:app --reload

ui:
	cd ui && npm run dev

test:
	.venv/bin/pytest

clean:
	rm -rf .venv .node ui/node_modules ui/dist
	find . -type d -name __pycache__ -exec rm -rf {} +
