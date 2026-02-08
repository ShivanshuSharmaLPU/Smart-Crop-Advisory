import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        location: '',
        soilDetails: { N: 0, P: 0, K: 0, ph: 7 }
    });
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        // Handle nested state for soilDetails
        if (['N', 'P', 'K', 'ph'].includes(e.target.name)) {
            setFormData({
                ...formData,
                soilDetails: { ...formData.soilDetails, [e.target.name]: parseFloat(e.target.value) }
            });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-primary">Farmer Registration</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Full Name</label>
                        <input type="text" name="name" className="input-field" onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input type="email" name="email" className="input-field" onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input type="password" name="password" className="input-field" onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Location (City)</label>
                        <input type="text" name="location" className="input-field" onChange={handleChange} required />
                    </div>
                </div>

                <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3 text-secondary">Default Soil Details (Optional)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm">Nitrogen (N)</label>
                            <input type="number" name="N" className="input-field" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm">Phosphorus (P)</label>
                            <input type="number" name="P" className="input-field" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm">Potassium (K)</label>
                            <input type="number" name="K" className="input-field" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm">pH Level</label>
                            <input type="number" name="ph" step="0.1" className="input-field" onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <button type="submit" className="w-full btn-primary">Register</button>
            </form>
            <p className="mt-4 text-center text-sm">
                Already have an account? <Link to="/login" className="text-primary hover:underline">Login here</Link>
            </p>
        </div>
    );
};

export default Register;
