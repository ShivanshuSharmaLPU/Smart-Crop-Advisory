import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const CropForm = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    // Default values from user profile if available
    const [formData, setFormData] = useState({
        N: user?.soilDetails?.N || 0,
        P: user?.soilDetails?.P || 0,
        K: user?.soilDetails?.K || 0,
        ph: user?.soilDetails?.ph || 7,
        temperature: 25, // Default or fetch from weather
        humidity: 50,
        rainfall: 100
    });
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setPrediction(null);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/advisory/crop', formData, {
                headers: { 'x-auth-token': token }
            });
            setPrediction(res.data.prediction);
        } catch (err) {
            setError('Failed to get recommendation. Ensure ML service is running.');
        }
        setLoading(false);
    };

    return (
        <div className="card">
            <h3 className="text-xl font-bold mb-4 text-primary">{t('cropAdvisory')}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <label className="text-xs text-gray-500">Nitrogen</label>
                        <input type="number" name="N" value={formData.N} onChange={handleChange} className="input-field text-sm" />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500">Phosphorus</label>
                        <input type="number" name="P" value={formData.P} onChange={handleChange} className="input-field text-sm" />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500">Potassium</label>
                        <input type="number" name="K" value={formData.K} onChange={handleChange} className="input-field text-sm" />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500">pH</label>
                        <input type="number" step="0.1" name="ph" value={formData.ph} onChange={handleChange} className="input-field text-sm" />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500">Temperature</label>
                        <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} className="input-field text-sm" />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500">Humidity</label>
                        <input type="number" name="humidity" value={formData.humidity} onChange={handleChange} className="input-field text-sm" />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500">Rainfall</label>
                        <input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} className="input-field text-sm" />
                    </div>
                </div>

                <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
                    {loading ? t('loading') : "Get Recommendation"}
                </button>
            </form>

            {prediction && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Recommended Crop:</p>
                    <p className="text-2xl font-bold text-green-700 uppercase">{prediction}</p>
                </div>
            )}
            {error && <p className="mt-2 text-red-500 text-sm text-center">{error}</p>}
        </div>
    );
};

export default CropForm;
