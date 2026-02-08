import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# Create model directory
if not os.path.exists('models'):
    os.makedirs('models')

print("Training dummy Crop Recommendation Model...")

# 1. CROP RECOMMENDATION MODEL (Mock Data)
# N, P, K, temperature, humidity, ph, rainfall, label
# This is just a tiny sample to make it 'work' technically. 
# Real model needs the real dataset (Crop_recommendation.csv).

# Feature columns: N, P, K, temperature, humidity, ph, rainfall
X_crop = np.array([
    [90, 42, 43, 20.8, 82.0, 6.5, 202.9], # Rice
    [85, 58, 41, 21.7, 80.3, 7.0, 226.6], # Rice
    [0, 0, 0, 0, 0, 0, 0],                # Hack to handle edge cases if needed or just noise
    [60, 55, 44, 23.0, 60.0, 6.2, 100.0], # Maize
    [10, 10, 10, 30.0, 40.0, 5.5, 50.0],  # Mothbeans
])
y_crop = np.array(['rice', 'rice', 'rice', 'maize', 'mothbeans'])

crop_model = RandomForestClassifier(n_estimators=10)
crop_model.fit(X_crop, y_crop)
joblib.dump(crop_model, 'models/crop_recommendation.pkl')
print("Saved models/crop_recommendation.pkl")


# 2. FERTILIZER RECOMMENDATION MODEL (Mock Data)
# Temparature, Humidity, Moisture, Soil Type, Crop Type, Nitrogen, Potassium, Phosphorous, Fertilizer Name
# We will simplify inputs for this demo model to: N, P, K
# 0: Urea, 1: DAP, 2: 14-35-14, 3: 28-28, 4: 17-17-17, 5: 20-20, 6: 10-26-26

print("Training dummy Fertilizer Recommendation Model...")

# Input: N, P, K
X_fert = np.array([
    [37, 0, 0],   # Urea high N
    [10, 40, 10], # DAP high P
    [10, 10, 40], # High K
    [20, 20, 20], # Balanced
])
y_fert = np.array(['Urea', 'DAP', 'MOP', '19-19-19 NPK'])

fert_model = RandomForestClassifier(n_estimators=10)
fert_model.fit(X_fert, y_fert)
joblib.dump(fert_model, 'models/fertilizer_recommendation.pkl')
print("Saved models/fertilizer_recommendation.pkl")

print("Done.")
