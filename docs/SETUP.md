# Avocado Price Predictor - Next.js App

## Setup Instructions

### 1. Install Flask dependencies

```bash
pip install flask flask-cors
```

### 2. Start Python API (from root directory)

```bash
python api.py
```

API runs on: http://localhost:5000

### 3. Install Next.js dependencies

```bash
cd web
npm install
```

### 4. Start Next.js app

```bash
npm run dev
```

App runs on: http://localhost:3000

## Usage

1. Fill in the form with avocado details
2. Select region and type
3. Enter month and year
4. Click "Predict Price"
5. View the predicted price

## Features

- Region selection (10 regions)
- Type selection (conventional/organic)
- Month and year inputs
- Volume and bag quantity inputs
- Real-time prediction from Flask API
