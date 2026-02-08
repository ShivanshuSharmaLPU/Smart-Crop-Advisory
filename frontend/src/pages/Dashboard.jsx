import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import WeatherCard from '../components/WeatherCard';
import CropForm from '../components/CropForm';
import FertilizerForm from '../components/FertilizerForm';
import YieldForm from '../components/YieldForm';
import DiseaseForm from '../components/DiseaseForm';

const Dashboard = () => {
    const { user } = useAuth();
    const { t } = useLanguage();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{t('dashboard')}</h1>
                    <p className="text-gray-500">{t('welcome')}, {user?.name}</p>
                </div>
                <div className="w-full md:w-96">
                    <WeatherCard location={user?.location || 'Delhi'} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Crop Advisory Section */}
                <section>
                    <CropForm />
                </section>

                {/* Fertilizer Advisory Section */}
                <section>
                    <FertilizerForm />
                </section>

                {/* Yield Prediction Section */}
                <section>
                    <YieldForm />
                </section>

                {/* Disease Detection Section */}
                <section>
                    <DiseaseForm />
                </section>
            </div>

            <div className="text-center text-sm text-gray-400 mt-10">
                <p>Smart Crop Advisory System v1.0 • Offline Supported</p>
            </div>
        </div>
    );
};

export default Dashboard;
