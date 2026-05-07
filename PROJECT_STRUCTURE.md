# Project Structure Guide

## Directory Tree

```
guaconomics/
│
├── 📖 Documentation
│   ├── README.md                 # Main project overview + badges + setup
│   ├── SETUP.md                  # Detailed setup instructions
│   ├── ARCHITECTURE.md           # System design & data flow
│   ├── CONTRIBUTING.md           # Contribution guidelines
│   ├── PROJECT_STRUCTURE.md      # This file
│   └── docs/                     # Additional docs & screenshots
│       └── screenshot-home.png   # UI screenshot
│
├── 🔙 Backend (Flask API)
│   ├── backend/
│   │   ├── api.py               # Flask REST API (main)
│   │   └── requirements.txt      # Python dependencies
│   │       ├── flask==2.3+
│   │       ├── scikit-learn==1.3+
│   │       ├── pandas==2.0+
│   │       ├── numpy
│   │       └── flask-cors
│   │
│   └── [Running on localhost:5000]
│       ├── GET  /health         # Health check
│       └── POST /predict        # Price prediction
│
├── 🎨 Frontend (Next.js React)
│   ├── web/                     # Next.js project root
│   │   ├── pages/
│   │   │   ├── _app.js         # Global app wrapper, fonts, CSS
│   │   │   └── index.js        # Main home page
│   │   │
│   │   ├── components/
│   │   │   ├── PredictionForm.js    # Form with 4 inputs + animations
│   │   │   ├── AvocadoMascot.js     # SVG character (4 expressions)
│   │   │   └── ResultCard.js        # Result display + tier badge
│   │   │
│   │   ├── styles/
│   │   │   └── globals.css          # Typography, colors, animations
│   │   │
│   │   ├── public/              # Static assets (favicon, etc.)
│   │   ├── .next/               # Next.js build output (auto-gen)
│   │   ├── node_modules/        # Dependencies (auto-gen)
│   │   ├── package.json         # Dependencies: react, next, framer-motion
│   │   ├── next.config.js       # Next.js config
│   │   └── .gitignore
│   │
│   └── [Running on localhost:3000]
│       └── / (Main page)
│
├── 🤖 Machine Learning
│   ├── src/
│   │   ├── notebooks/
│   │   │   └── 01_train_model.ipynb     # Full ML pipeline
│   │   │       ├── EDA (missing values, distributions)
│   │   │       ├── Encoding (one-hot, target)
│   │   │       ├── Train/test split (80/20)
│   │   │       ├── StandardScaler
│   │   │       ├── Linear Regression baseline
│   │   │       ├── Random Forest (chosen model)
│   │   │       ├── Model evaluation (R², RMSE, MAE)
│   │   │       └── Save pickle artifact
│   │   │
│   │   └── download_dataset.py  # Download Hass Avocado Board data
│   │
│   ├── models/
│   │   └── avocado_model_full.pkl      # Trained model artifact (122MB)
│   │       ├── 'model': Random Forest Regressor
│   │       ├── 'scaler': StandardScaler (fitted)
│   │       └── 'feature_names': List of 12 feature names
│   │
│   └── data/
│       ├── raw/
│       │   └── avocado.csv             # Original dataset (18K rows)
│       │       ├── Date
│       │       ├── AveragePrice        # Target variable
│       │       ├── Total Volume
│       │       ├── PLU 4046 (Small)
│       │       ├── PLU 4225 (Large)
│       │       ├── PLU 4770 (XLarge)
│       │       ├── Total Bags
│       │       ├── Small/Large/XLarge Bags
│       │       ├── Type (conventional/organic)
│       │       └── Region (54 US regions)
│       │
│       └── processed/          # (For future use)
│           └── train_test.pkl  # Pre-split data
│
├── 🧪 Testing & Config
│   ├── tests/
│   │   ├── test_api.py         # API endpoint tests
│   │   ├── test_model.py       # Model inference tests
│   │   └── test_components.js  # React component tests
│   │
│   ├── config/                 # Configuration files
│   │   ├── constants.py        # Magic numbers, thresholds
│   │   └── config.env          # Environment variables
│   │
│   └── .github/
│       └── workflows/          # CI/CD pipelines (GitHub Actions)
│           ├── test.yml
│           └── deploy.yml
│
├── 📋 Root Files
│   ├── README.md               # 👈 START HERE
│   ├── SETUP.md                # Step-by-step setup
│   ├── ARCHITECTURE.md         # System design
│   ├── CONTRIBUTING.md         # How to contribute
│   ├── LICENSE                 # MIT License
│   ├── .gitignore              # Git ignore patterns
│   ├── todo.md                 # Project todos
│   └── SETUP.md                # Original setup guide
│
└── Hidden files
    ├── .git/                   # Git history
    ├── .claude/                # Claude Code settings
    └── .DS_Store               # macOS (should be gitignored)
```

## File Purposes

### Documentation Files

| File | Purpose |
|---|---|
| **README.md** | Overview, badges, quick start, deployment |
| **SETUP.md** | Detailed environment setup instructions |
| **ARCHITECTURE.md** | System design, data flow, deployment options |
| **CONTRIBUTING.md** | How to contribute, code style, PR process |
| **PROJECT_STRUCTURE.md** | This file — explains directory layout |
| **LICENSE** | MIT license text |
| **.gitignore** | Files/dirs to ignore in git |

### Backend

| File | Purpose |
|---|---|
| **api.py** | Flask REST API server |
| **requirements.txt** | Python pip dependencies |

### Frontend

| File | Purpose |
|---|---|
| **pages/_app.js** | Global layout, Google Fonts, CSS imports |
| **pages/index.js** | Main home page component |
| **PredictionForm.js** | Form with region/type/size/year inputs |
| **AvocadoMascot.js** | SVG avocado character + expressions |
| **ResultCard.js** | Price display + tier badge + verdict |
| **globals.css** | Typography, colors, animations, responsive |

### Data

| File | Purpose |
|---|---|
| **avocado.csv** | Original dataset (18K rows, 2015-2023) |
| **avocado_model_full.pkl** | Trained Random Forest + StandardScaler |
| **01_train_model.ipynb** | Full ML pipeline (EDA → training → save) |

### Config

| File | Purpose |
|---|---|
| **next.config.js** | Next.js build & runtime config |
| **.env.local** | Local environment variables (gitignored) |

## Key Statistics

| Metric | Value |
|---|---|
| Total Files | ~30 |
| Python LOC | ~150 |
| JavaScript LOC | ~450 |
| Notebook Cells | ~25 |
| CSS Lines | ~200 |
| Data Records | 18,249 |
| Model Size | 122 MB |
| API Endpoints | 2 |
| React Components | 3 |
| SVG Expressions | 4 |

## Setup Checklist

- [ ] Clone repo: `git clone https://github.com/alexkimrow/guaconomics.git`
- [ ] Create venv: `python -m venv venv && source venv/bin/activate`
- [ ] Install Python deps: `pip install -r backend/requirements.txt`
- [ ] Install Node deps: `cd web && npm install`
- [ ] Start Flask: `python backend/api.py` (port 5000)
- [ ] Start Next.js: `cd web && npm run dev` (port 3000)
- [ ] Visit http://localhost:3000
- [ ] Test prediction: Submit form → see animated result

## Deployment Checklist

- [ ] Backend: Push to Render → set `PORT` env var
- [ ] Frontend: Push to Vercel → set `NEXT_PUBLIC_API_URL`
- [ ] Test production URLs
- [ ] Monitor logs for errors

## Git Workflow

```bash
# Create feature branch
git checkout -b alex/feature-name

# Make changes (no data files!)
# ...

# Commit concise messages
git add .
git commit -m "Add mascot animations"

# Push to GitHub
git push origin alex/feature-name

# Open pull request on GitHub
# → Review → Merge → Deploy
```

## Environment Variables

### Backend (.env or environment)
```
PORT=5000                    # Flask port (for deployment)
DEBUG=False                  # Production safety
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000  # Local dev
NEXT_PUBLIC_API_URL=https://api.render.com # Production
```

## Dependencies Overview

### Backend Stack
- **Framework:** Flask 2.3
- **ML:** scikit-learn 1.3, pandas 2.0, numpy
- **CORS:** flask-cors
- **Python:** 3.8+

### Frontend Stack
- **Framework:** Next.js 14, React 18
- **Animations:** Framer Motion 10+
- **Styling:** CSS modules + CSS variables
- **Fonts:** Google Fonts (Caveat, Nunito)
- **Node:** 18+

### Data
- **Source:** Hass Avocado Board
- **Format:** CSV (18K rows)
- **Time Range:** 2015-2023
- **Regions:** 54 US regions

## Common Tasks

### Train New Model
```bash
jupyter notebook src/notebooks/01_train_model.ipynb
# → Update models/avocado_model_full.pkl
```

### Run Tests
```bash
pytest tests/              # Backend
npm run test              # Frontend (from web/)
```

### Format Code
```bash
black backend/            # Python
prettier web/             # JavaScript
```

### Build for Production
```bash
cd web && npm run build && npm start
python backend/api.py
```

## Notes

- **No database:** All data in memory + CSV/pickle files
- **Stateless API:** Each request is independent
- **Large model file:** Use Git LFS or separate storage for deployment
- **Public repo:** No secrets, no API keys, no credentials
- **MIT License:** Free for personal & commercial use
