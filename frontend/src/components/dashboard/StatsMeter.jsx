import { motion } from 'framer-motion';

const StatsMeter = ({ percentage, label, color = "#3B82F6" }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress Circle */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="64"
            cy="64"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
            className="drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          />
        </svg>
        
        {/* Percentage Text */}
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-bold text-white font-display">{percentage}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm text-gray-400 font-medium tracking-wide">{label}</span>
    </div>
  );
};

export default StatsMeter;
