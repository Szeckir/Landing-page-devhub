import React from 'react';
import { motion } from 'framer-motion';

interface UrgencyBadgeProps {
  text: string;
  className?: string;
}

const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ text, className = '' }) => {
  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    >
      <span className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg">
        <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
        {text}
      </span>
    </motion.div>
  );
};

export default UrgencyBadge;

