import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Leaf, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { language, setLanguage, t } = useLanguage();

    return (
        <nav className="bg-primary text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
                    <Leaf />
                    <span>{t('title')}</span>
                </Link>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                        className="bg-white text-primary px-3 py-1 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
                    >
                        {language === 'en' ? 'हिंदी' : 'English'}
                    </button>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span className="hidden md:inline">{t('welcome')}, {user.name}</span>
                            <button onClick={logout} className="flex items-center space-x-1 hover:text-green-200">
                                <LogOut size={18} />
                                <span className="hidden md:inline">{t('logout')}</span>
                            </button>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link to="/login" className="hover:text-green-200">{t('login')}</Link>
                            <Link to="/register" className="bg-secondary px-4 py-2 rounded-lg hover:bg-amber-600 transition">{t('register')}</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
