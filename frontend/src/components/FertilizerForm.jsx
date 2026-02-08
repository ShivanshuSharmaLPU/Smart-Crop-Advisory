import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const FertilizerForm = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        N: user?.soilDetails?.N || 0,
        P: user?.soilDetails?.P || 0,
        K: user?.soilDetails?.K || 0,
        // Add more fields if needed matching the ML model
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
            const res = await axios.post('/api/advisory/fertilizer', formData, {
                headers: { 'x-auth-token': token }
            });
            setPrediction(res.data.prediction);
        } catch (err) {
            setError('Failed to get recommendation.');
        }
        setLoading(false);
    };

    return (
        <div className="card">
            <h3 className="text-xl font-bold mb-4 text-secondary">{t('fertAdvisory')}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
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
                </div>

                <button type="submit" disabled={loading} className="w-full bg-secondary text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition disabled:opacity-50">
                    {loading ? t('loading') : "Get Recommendation"}
                </button>
            </form>

            {prediction && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Recommended Fertilizer:</p>
                    <p className="text-xl font-bold text-amber-700">{prediction}</p>
                </div>
            )}
            {error && <p className="mt-2 text-red-500 text-sm text-center">{error}</p>}
        </div>
    );
};

export default FertilizerForm;
