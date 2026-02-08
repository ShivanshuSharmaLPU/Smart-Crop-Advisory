from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load Models
try:
    crop_model = joblib.load('models/crop_recommendation.pkl')
    fert_model = joblib.load('models/fertilizer_recommendation.pkl')
    print("Models loaded successfully.")
except Exception as e:
    print(f"Error loading models: {e}")
    crop_model = None
    fert_model = None

@app.route('/')
def home():
    return "Smart Crop Advisory ML Service is Running!"

@app.route('/predict_crop', methods=['POST'])
def predict_crop():
    if not crop_model:
        return jsonify({'error': 'Model not loaded'}), 500
    
    data = request.json
    try:
        # Expected keys: N, P, K, temperature, humidity, ph, rainfall
        features = [
            data.get('N'),
            data.get('P'),
            data.get('K'),
            data.get('temperature'),
            data.get('humidity'),
            data.get('ph'),
            data.get('rainfall')
        ]
        
        # Simple validation
        if None in features:
            return jsonify({'error': 'Missing input values. Required: N, P, K, temperature, humidity, ph, rainfall'}), 400

        prediction = crop_model.predict([np.array(features)])
        return jsonify({'prediction': prediction[0]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict_fertilizer', methods=['POST'])
def predict_fertilizer():
    if not fert_model:
        return jsonify({'error': 'Model not loaded'}), 500
    
    data = request.json
    try:
        # Expected keys: N, P, K
        # In a real app, this would include soil type, crop type etc.
        features = [
            data.get('N'),
            data.get('P'),
            data.get('K')
        ]
        
        if None in features:
            return jsonify({'error': 'Missing input values. Required: N, P, K'}), 400

        prediction = fert_model.predict([np.array(features)])
        return jsonify({'prediction': prediction[0]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict_yield', methods=['POST'])
def predict_yield():
    # Mock Yield Prediction
    # Logic: Random yield based on crop and area
    data = request.json
    try:
        crop = data.get('crop', 'wheat')
        area = float(data.get('area', 1.0)) # in hectares
        
        # Mock calculation
        base_yield = {'rice': 4.0, 'wheat': 3.5, 'maize': 5.0} # tons per hectare
        yield_per_ha = base_yield.get(crop.lower(), 3.0)
        
        # Add some randomness based on inputs (mocking ML)
        total_yield = yield_per_ha * area
        
        return jsonify({'prediction': f"{total_yield:.2f} Tons"})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict_disease', methods=['POST'])
def predict_disease():
    # Mock Disease Detection
    # In a real app, this would process an uploaded image
    # Here we just return a random disease based on crop
    data = request.json
    try:
        crop = data.get('crop', 'rice')
        
        diseases = {
            'rice': ['Bacterial Leaf Blight', 'Brown Spot', 'Healthy'],
            'wheat': ['Loose Smut', 'Rust', 'Healthy'],
            'maize': ['Leaf Blight', 'Common Rust', 'Healthy']
        }
        
        possible_diseases = diseases.get(crop.lower(), ['Healthy', 'Unknown Disease'])
        prediction = np.random.choice(possible_diseases)
        
        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
