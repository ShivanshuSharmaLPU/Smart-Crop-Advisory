import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import StatsMeter from '../components/dashboard/StatsMeter';
import WeatherCard from '../components/WeatherCard';
import CropForm from '../components/CropForm';
import FertilizerForm from '../components/FertilizerForm';
import YieldForm from '../components/YieldForm';
import DiseaseForm from '../components/DiseaseForm';
import GlassCard from '../components/ui/GlassCard';

const Dashboard = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    
    // Mock user stats - in a real app these would come from the backend
    const stats = [
        { label: "Crop Health", value: 87, color: "#10B981" },
        { label: "Soil Quality", value: 74, color: "#F59E0B" },
        { label: "Water Level", value: 62, color: "#3B82F6" }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="pb-20 pt-24 min-h-screen">
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="container mx-auto px-4 max-w-7xl"
            >
                {/* Hero Section */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div>
                        <motion.h1 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl md:text-7xl font-bold font-display text-white mb-2"
                        >
                            Hello, <span className="text-gradient">{user?.name || "Farmer"}</span>
                        </motion.h1>
                        <p className="text-gray-400 text-lg">Here's your farm's daily intelligence report.</p>
                    </div>
                    
                    {/* Weather Widget Wrapper */}
                    <div className="w-full md:w-auto">
                        <GlassCard className="!p-0 overflow-hidden min-w-[300px]">
                             <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
                                <WeatherCard location={user?.location || 'Delhi'} />
                             </div>
                        </GlassCard>
                    </div>
                </motion.div>

                {/* Stats Row */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <GlassCard key={index} hoverEffect={true} className="flex items-center justify-between">
                            <div>
                                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">{stat.label}</h3>
                                <p className="text-3xl font-bold text-white">{stat.value}<span className="text-sm text-gray-500 ml-1">/100</span></p>
                            </div>
                            <StatsMeter percentage={stat.value} label="" color={stat.color} />
                        </GlassCard>
                    ))}
                </motion.div>

                {/* Main Tools Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div variants={itemVariants}>
                        <div className="mb-4 flex items-center gap-2">
                            <h2 className="text-2xl font-bold text-white font-display">Crop Analysis</h2>
                            <div className="h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent ml-4"></div>
                        </div>
                        <CropForm />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <div className="mb-4 flex items-center gap-2">
                            <h2 className="text-2xl font-bold text-white font-display">Soil & Fertilizer</h2>
                            <div className="h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent ml-4"></div>
                        </div>
                        <FertilizerForm />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <div className="mb-4 flex items-center gap-2">
                             <h2 className="text-2xl font-bold text-white font-display">Yield Prediction</h2>
                             <div className="h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent ml-4"></div>
                        </div>
                        <YieldForm />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                         <div className="mb-4 flex items-center gap-2">
                             <h2 className="text-2xl font-bold text-white font-display">Disease Detection</h2>
                             <div className="h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent ml-4"></div>
                        </div>
                        <DiseaseForm />
                    </motion.div>
                </div>

                <motion.div variants={itemVariants} className="mt-16 text-center border-t border-white/5 pt-8">
                     <p className="text-gray-500 text-sm">AI-Powered Smart Crop Advisory System • v2.0</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
