import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CloudRain, Thermometer, Droplets } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WeatherCard = ({ location }) => {
    const [weather, setWeather] = useState(null);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchWeather = async () => {
            if (!location) return;
            try {
                // In production, better to have a dedicated backend route that caches this
                // For now, calling our backend route
                const res = await axios.get(`/api/weather/${location}`);
                setWeather(res.data);
            } catch (err) {
                console.error("Failed to fetch weather", err);
            }
        };
        fetchWeather();
    }, [location]);

    if (!weather) return <div className="card animate-pulse h-40 flex items-center justify-center">Loading Weather...</div>;

    return (
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold">{weather.city}</h3>
                    <p className="capitalize opacity-90">{weather.description}</p>
                </div>
                <img
                    src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                    alt="weather icon"
                    className="w-12 h-12 bg-white/20 rounded-full"
                />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                    <Thermometer size={20} />
                    <span className="text-2xl font-bold">{weather.temp}°C</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Droplets size={20} />
                    <span>{weather.humidity}% {t('weather')}</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
