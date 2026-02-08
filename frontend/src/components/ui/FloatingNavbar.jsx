import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const FloatingNavbar = () => {
    const location = useLocation();
    const { user } = useAuth();
    
    const navItems = [
        { name: 'Dashboard', path: '/' },
        { name: 'Analytics', path: '/analytics' },
        { name: 'Settings', path: '/settings' },
    ];

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <motion.div 
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex items-center gap-2 px-2 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl"
            >
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link 
                            key={item.name} 
                            to={item.path}
                            className="relative px-6 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-white/10 rounded-full border border-white/5 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className={isActive ? "text-white" : "text-gray-400 hover:text-white transition-colors"}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
                
                {/* User Avatar */}
                <div className="ml-4 pl-4 border-l border-white/10 flex items-center gap-3 pr-2">
                     <div className="text-right hidden sm:block">
                        <p className="text-xs text-white font-medium">{user?.name || 'Guest'}</p>
                        <p className="text-[10px] text-accent">{user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
                        <div className="w-full h-full rounded-full bg-black/50" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default FloatingNavbar;
