# Troubleshooting

## Common Issues

### API won't start

```bash
# Check Python version
python3 --version

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### UI shows blank page

```bash
# Clear node_modules
rm -rf ui/node_modules
cd ui && npm install
```

### FAISS import error

```bash
# Install faiss-cpu
pip install faiss-cpu
```

### Port already in use

```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

## Getting Help

1. Check the [FAQ](FAQ.md)
2. Search existing issues
3. Open a new issue
