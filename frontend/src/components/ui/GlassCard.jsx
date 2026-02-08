import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", hoverEffect = false }) => {
  return (
    <motion.div 
      whileHover={hoverEffect ? { scale: 1.02, boxShadow: "0 0 25px rgba(59, 130, 246, 0.1)" } : {}}
      transition={{ duration: 0.3 }}
      className={`glass-panel p-6 backdrop-blur-md bg-white/5 border border-white/10 shadow-xl rounded-2xl ${className}`}
    >
      {/* Inner Glow Reflection */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
