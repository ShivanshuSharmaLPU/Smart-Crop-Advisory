import { motion } from 'framer-motion';

const GlowingButton = ({ children, onClick, className = "", variant = "primary" }) => {
  
  const variants = {
    primary: "from-primary to-secondary shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_35px_rgba(59,130,246,0.7)]",
    secondary: "from-surface to-surface-highlight border border-white/10 hover:bg-white/10"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative px-6 py-3 rounded-xl font-semibold text-white overflow-hidden group transition-all duration-300 ${variant === 'primary' ? 'bg-gradient-to-r' : ''} ${variants[variant]} ${className}`}
    >
      {/* Shine Effect */}
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default GlowingButton;
