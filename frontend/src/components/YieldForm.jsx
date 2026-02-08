import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const YieldForm = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        crop: 'Rice',
        area: 1
    });
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/advisory/yield', formData, {
                headers: { 'x-auth-token': token }
            });
            setPrediction(res.data.prediction);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="card">
            <h3 className="text-xl font-bold mb-4 text-purple-600">Yield Prediction</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-gray-500">Crop Name</label>
                        <select
                            name="crop"
                            className="input-field text-sm"
                            value={formData.crop}
                            onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                        >
                            <option value="Rice">Rice</option>
                            <option value="Wheat">Wheat</option>
                            <option value="Maize">Maize</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs text-gray-500">Area (Hectares)</label>
                        <input
                            type="number"
                            name="area"
                            value={formData.area}
                            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                            className="input-field text-sm"
                        />
                    </div>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50">
                    {loading ? 'Calculating...' : "Predict Yield"}
                </button>
            </form>
            {prediction && (
                <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded text-center">
                    <p className="text-sm">Estimated Yield:</p>
                    <p className="text-lg font-bold text-purple-700">{prediction}</p>
                </div>
            )}
        </div>
    );
};

export default YieldForm;
