import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Upload } from 'lucide-react';

const DiseaseForm = () => {
    const { user } = useAuth();
    const [crop, setCrop] = useState('Rice');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // In a real app, use FormData to upload file
        // const formData = new FormData();
        // formData.append('image', image);

        // Mocking the request with just crop name
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/advisory/disease', { crop }, {
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
            <h3 className="text-xl font-bold mb-4 text-red-600">Disease Detection</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-xs text-gray-500">Crop Type</label>
                    <select
                        className="input-field text-sm"
                        value={crop}
                        onChange={(e) => setCrop(e.target.value)}
                    >
                        <option value="Rice">Rice</option>
                        <option value="Wheat">Wheat</option>
                        <option value="Maize">Maize</option>
                    </select>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {preview ? (
                        <img src={preview} alt="Preview" className="mx-auto h-32 object-contain" />
                    ) : (
                        <div className="text-gray-400">
                            <Upload className="mx-auto mb-2" />
                            <span className="text-xs">Click to upload Leaf Image</span>
                        </div>
                    )}
                </div>

                <button type="submit" disabled={!image || loading} className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50">
                    {loading ? 'Scanning...' : "Detect Disease"}
                </button>
            </form>
            {prediction && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-center">
                    <p className="text-sm">Detected Disease:</p>
                    <p className="text-lg font-bold text-red-700">{prediction}</p>
                </div>
            )}
        </div>
    );
};

export default DiseaseForm;
