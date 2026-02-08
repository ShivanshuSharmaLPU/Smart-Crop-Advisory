import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FloatingNavbar from './components/ui/FloatingNavbar';
import BackgroundGradient from './components/ui/BackgroundGradient';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <BackgroundGradient>
                <div className="min-h-screen flex flex-col relative z-10">
                    {/* Show FloatingNavbar only - or we could condition it on login */}
                    <FloatingNavbar />
                    
                    <div className="flex-grow">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/" element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            } />
                             {/* Add placeholders for other nav items if they don't exist yet */}
                            <Route path="/analytics" element={<div className="p-20 text-center text-white">Analytics Module Coming Soon</div>} />
                            <Route path="/settings" element={<div className="p-20 text-center text-white">Settings Module Coming Soon</div>} />
                        </Routes>
                    </div>
                </div>
            </BackgroundGradient>
        </Router>
    );
}

export default App;
