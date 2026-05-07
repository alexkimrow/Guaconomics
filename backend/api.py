from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
import os

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load model
with open('avocado_model_full.pkl', 'rb') as f:
    data = pickle.load(f)
    model = data['model']
    scaler = data['scaler']
    feature_names = data['feature_names']


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        req_data = request.json
        
        # Realistic median volumes from the dataset
        volume = 107376.0 
        size = req_data.get('size', 'Large')
        
        # Shift the size distribution based on selection
        if size == 'Small':
            vol_4046, vol_4225, vol_4770 = 80000, 20000, 1000
        elif size == 'Large':
            vol_4046, vol_4225, vol_4770 = 20000, 80000, 1000
        else: # XLarge
            vol_4046, vol_4225, vol_4770 = 20000, 10000, 60000
            
        # Create a Pandas DataFrame instead of a row numpy array 
        features_df = pd.DataFrame([[
            volume,
            vol_4046,
            vol_4225,
            vol_4770,
            39743,          # Median Total Bags
            26362,          # Median Small Bags
            2647,           # Median Large Bags
            0,              # Median XLarge Bags
            req_data.get('year', 2023),
            req_data.get('type_conventional', 1),
            req_data.get('type_organic', 0),
            req_data.get('region_encoded', 1.4)
        ]], columns=feature_names)
        
        # Predict
        scaled_features = scaler.transform(features_df)
        prediction = model.predict(scaled_features)[0]
        
        final_price = max(0.50, float(prediction))
        
        return jsonify({'price': final_price})
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
