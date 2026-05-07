# Contributing Guide

Thanks for your interest in Guaconomics! Here's how to contribute.

## Getting Started

### 1. Fork & Clone
```bash
git clone https://github.com/YOUR_USERNAME/guaconomics.git
cd guaconomics
```

### 2. Create a branch
```bash
git checkout -b alex/your-feature-name
```

### 3. Set up local environment
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd ../web
npm install
```

### 4. Run locally
```bash
# Terminal 1: Flask API
cd backend
python api.py  # http://localhost:5000

# Terminal 2: Next.js
cd web
npm run dev    # http://localhost:3000
```

## Code Style

### Python
- Follow [PEP 8](https://pep8.org)
- Format: `black` (2026 standard)
- Type hints encouraged

### JavaScript/React
- Use `const`/`let` (no `var`)
- Functional components with hooks
- Framer Motion for animations
- Comment sparingly (code should be self-documenting)

### CSS
- CSS modules preferred
- Mobile-first responsive design
- Use CSS variables for colors

## Making Changes

### Backend Changes

1. Update `backend/api.py` or dependencies
2. Add unit tests in `tests/`
3. Test locally: `curl -X POST http://localhost:5000/predict ...`
4. Update `backend/requirements.txt` if needed

### Frontend Changes

1. Update components in `web/components/`
2. Update styles in `web/styles/globals.css`
3. Test in browser: http://localhost:3000
4. Check animations work smoothly

### Model Changes

1. Modify `src/notebooks/01_train_model.ipynb`
2. Run notebook to generate new `models/avocado_model_full.pkl`
3. Test predictions with new model
4. Document any hyperparameter changes

## Commit Messages

Be concise! Use imperative form:

```
✅ Good:
  - Add tier badge animations
  - Fix region encoding mismatch
  - Update model RMSE calculation

❌ Bad:
  - fixed stuff
  - updated the thing
  - changes to api
```

## Pull Request Process

1. **Commit your changes** with clear messages
2. **Push to your fork**: `git push origin alex/your-feature-name`
3. **Open PR** on GitHub with:
   - Clear title: "Fix mascot animation jitter"
   - Description: What problem does this solve?
   - Linked issues: "Fixes #42"
   - Screenshots: For UI changes
4. **Wait for review** — maintainers will provide feedback
5. **Address feedback** — make requested changes
6. **Merge** — once approved!

## Types of Contributions

### 🐛 Bug Fixes
- Describe the bug clearly
- Show how to reproduce it
- Explain your fix

### ✨ Features
- Describe the use case
- Show design mockups for UI
- Discuss implementation approach

### 📚 Documentation
- README updates
- Code comments
- Architecture docs

### 🧪 Tests
- Unit tests for utility functions
- Integration tests for API
- E2E tests for UI flows

### 🎨 Design/UI
- Accessibility improvements
- Animation enhancements
- Color/typography tweaks

## Testing

### Backend Tests
```bash
# Manual API tests
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"size":"Large","year":2023,"type_conventional":1,"type_organic":0,"region_encoded":1.39}'
```

### Frontend Tests
```bash
# Run tests
cd web
npm run test

# Test specific component
npm run test -- -t "PredictionForm"

# Lint code
npm run lint
```

## Questions?

- 💬 Open an issue with `[Question]` tag
- 📧 Email: roalex1995@gmail.com
- 📖 Check existing issues first

## Code of Conduct

- Be respectful & inclusive
- No harassment or discrimination
- Focus on code, not the person
- Assume good faith

---

Happy guac-coding! 🥑
