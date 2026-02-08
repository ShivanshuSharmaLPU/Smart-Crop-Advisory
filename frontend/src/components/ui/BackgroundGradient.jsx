import { motion } from 'framer-motion';

const BackgroundGradient = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden selection:bg-primary selection:text-white">
      {/* Animated Gradient Blobs */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, -30, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-secondary/15 rounded-full blur-[120px]"
        />
         <motion.div 
          animate={{ 
            x: [0, 30, 0], 
            y: [0, 40, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]"
        />
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-[#0A0A0F] opacity-50 z-0 pointer-events-none mix-blend-overlay"></div>

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default BackgroundGradient;
