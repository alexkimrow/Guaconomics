# System Architecture

## Overview

Guaconomics is a full-stack application with a clear separation between the ML backend and the interactive frontend.

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │   Next.js Frontend (React)                       │   │
│  │  - PredictionForm (input collection)             │   │
│  │  - AvocadoMascot (animated character)            │   │
│  │  - ResultCard (price + tier + verdict)           │   │
│  └──────────────────────────────────────────────────┘   │
│              ↓ (REST API - fetch)  ↑                     │
└─────────────────────────────────────────────────────────┘
               ↓                              ↑
        HTTP POST /predict            HTTP 200 + JSON
               ↓                              ↑
┌─────────────────────────────────────────────────────────┐
│             Flask Backend (Python)                       │
│  ┌──────────────────────────────────────────────────┐   │
│  │   /predict endpoint                              │   │
│  │   - Load model + scaler                          │   │
│  │   - Parse request (size, year, type, region)     │   │
│  │   - Create feature vector                        │   │
│  │   - Scale features                               │   │
│  │   - Predict with Random Forest                   │   │
│  │   - Floor price at $0.50                         │   │
│  │   - Return JSON {price: float}                   │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
               ↓ (load at startup)
┌─────────────────────────────────────────────────────────┐
│              ML Model Artifact                           │
│  - avocado_model_full.pkl (122MB)                       │
│    ├── 'model': Random Forest Regressor                 │
│    ├── 'scaler': StandardScaler instance                │
│    └── 'feature_names': [12 feature names]              │
└─────────────────────────────────────────────────────────┘
```

## Backend Architecture

### Flask API (`backend/api.py`)

**Endpoints:**

1. **GET /health**
   - Liveness check
   - Response: `{"status": "ok"}`

2. **POST /predict**
   - Main prediction endpoint
   - Input: JSON with form data
   - Output: `{"price": float}`

**Request Flow:**

```python
POST /predict
    ↓
Parse request.json → Extract size, year, type, region
    ↓
Compute size-based volumes:
  - Small → (80K, 20K, 1K) for (4046, 4225, 4770)
  - Large → (20K, 80K, 1K)
  - XLarge → (20K, 10K, 60K)
    ↓
Create feature vector: [volume, vol_4046, vol_4225, vol_4770, 
                        bags, small_bags, large_bags, xlarge_bags,
                        year, type_conv, type_org, region_encoded]
    ↓
Scale features using pre-fit StandardScaler
    ↓
model.predict(scaled_features)
    ↓
Apply floor: max(0.50, prediction)
    ↓
Return JSON response
```

### Model Details

**Type:** scikit-learn Random Forest Regressor

**Training Pipeline:**
1. Load 18K avocado records
2. Encode categorical features (region, type)
3. Create temporal features (year from date)
4. 80/20 train-test split
5. StandardScaler normalization
6. Random Forest with default hyperparams
7. Evaluate: R²=0.65+, RMSE=$0.22, MAE=$0.16
8. Pickle with scaler + feature names

**Features (12 total):**
- Total Volume (numeric)
- Volume 4046 (numeric) — Small avocados
- Volume 4225 (numeric) — Large avocados
- Volume 4770 (numeric) — XLarge avocados
- Total Bags (numeric)
- Small Bags (numeric)
- Large Bags (numeric)
- XLarge Bags (numeric)
- Year (numeric) — 2015-2025
- Type Conventional (binary) — 1 if conventional, 0 if organic
- Type Organic (binary) — 1 if organic, 0 if conventional
- Region Encoded (numeric) — Target-encoded region mean price

## Frontend Architecture

### Next.js Structure

**Pages:**
- `pages/_app.js` — Global layout, font imports, CSS
- `pages/index.js` — Main page with animations

**Components:**

1. **PredictionForm.js**
   - Controlled form with 4 inputs (region, type, size, year)
   - Hardcoded region → encoding mapping
   - Framer Motion staggerChildren animation
   - Sends POST to `/predict` on submit

2. **AvocadoMascot.js**
   - SVG avocado character
   - 4 expression states:
     - `idle` — neutral smile
     - `thinking` — eyes up (during prediction)
     - `cheap` — big happy grin (budget price)
     - `expensive` — worried face (splurge price)
   - AnimatePresence for state transitions
   - CSS float keyframe for bobbing

3. **ResultCard.js**
   - Displays price + tier + verdict
   - Tier logic based on price ranges:
     - < $0.80 → "Budget Guac 💸"
     - $0.80–$1.20 → "Reasonable 👍"
     - $1.20–$1.60 → "Pricey 😬"
     - > $1.60 → "Splurge Zone 🤑"
   - Framer Motion entrance animation (slide + fade)

**Styling:**
- CSS modules in `styles/globals.css`
- Color palette via CSS custom properties
- Wobbly borders (different border-radius per corner)
- Google Fonts: Caveat (headings), Nunito (body)
- Animations: Framer Motion + CSS keyframes

### Data Flow

```
User Input
    ↓
PredictionForm.handleChange → Update local state
    ↓
User clicks "Predict the Guac →"
    ↓
handleSubmit():
  - setLoading(true)
  - setMascotState('thinking')
  - fetch POST /predict with formData
    ↓
Backend returns {price: float}
    ↓
setPrice(price)
    ↓
Determine tier based on price:
  - < $0.80 → cheap
  - >= $1.20 → expensive
  - else → reasonable
    ↓
setMascotState(tier)
    ↓
ResultCard renders with:
  - Price
  - Tier badge
  - Verdict text
  - Framer Motion animations
```

## Deployment Architecture

### Option 1: Vercel + Render (Recommended)

```
┌─────────────────────┐
│    GitHub repo      │
│  (push commits)     │
└──────────┬──────────┘
           │
           ├─────────────────────┐
           │                     │
           ↓                     ↓
      ┌─────────┐         ┌──────────┐
      │ Vercel  │         │ Render   │
      │ (Next.js│         │ (Flask   │
      │ frontend)         │  API)    │
      └────┬────┘         └────┬─────┘
           │                   │
      users.vercel.app      api.render.com
      └─────────────────────┘
```

### Option 2: Self-hosted

```
┌──────────────────────┐
│  Single Server (EC2) │
│  ├── Port 3000       │
│  │  └─ Next.js prod  │
│  ├── Port 5000       │
│  │  └─ Flask API     │
│  └── models/         │
│     └─ PKL file      │
└──────────────────────┘
```

## Key Design Decisions

### 1. **Separate Backend/Frontend**
- **Why:** Decoupling allows independent scaling + deployment
- **Trade-off:** Extra network calls vs. flexibility

### 2. **Hardcoded Region Encoding**
- **Why:** Simple, no DB overhead for region mappings
- **Trade-off:** Must update frontend if regions change
- **Future:** Could fetch from `/regions` endpoint

### 3. **SVG Mascot (No Images)**
- **Why:** Zero image assets, tiny bundle size, scalable
- **Trade-off:** Limited animation complexity

### 4. **Framer Motion + CSS**
- **Why:** Smooth animations without heavy library
- **Trade-off:** More manual control vs. less code

### 5. **Pickle Model Artifact**
- **Why:** Fast load time, preserves all objects (scaler, feature names)
- **Trade-off:** Large file size (122MB), Python-only
- **Future:** ONNX for cross-language portability

## Error Handling

### Frontend
```javascript
try {
  const response = await fetch(`${apiUrl}/predict`, {...})
  const data = await response.json()
  setPrice(data.price)
} catch (err) {
  setError(err.message || 'Error making prediction')
  setMascotState('idle')
}
```

### Backend
```python
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # ... prediction logic
        return jsonify({'price': final_price})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 400
```

## Performance Considerations

| Component | Metric | Target |
|-----------|--------|--------|
| Model Load | Time | <100ms (cached) |
| Prediction | Time | <50ms |
| Frontend Bundle | Size | <150KB |
| API Response | Time | <200ms |
| UI Animation | FPS | 60+ |

## Security Notes

- No auth (public project)
- No data persistence (stateless API)
- Model file is public (no sensitive data)
- Flask CORS enabled for all routes
- Input validation via pandas DataFrame schema
- No SQL injection (no DB)
- No XSS (no user-generated content rendering)

## Future Enhancements

1. **Database** — PostgreSQL for region mappings, prediction history
2. **Caching** — Redis for repeated predictions
3. **Model Updates** — Periodic retraining pipeline
4. **More Regions** — Use all 54 regions instead of 10
5. **Error Analysis** — Track prediction errors per region
6. **A/B Testing** — Test different UI/verdict variants
7. **Analytics** — Track popular predictions, user flows
8. **Mobile App** — React Native version
