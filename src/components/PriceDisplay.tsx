import React from 'react';
import { motion } from 'framer-motion';

interface PriceDisplayProps {
  price: string;
  originalPrice?: string;
  className?: string;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ 
  price, 
  originalPrice, 
  className = '' 
}) => {
  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {originalPrice && (
        <div className="text-sm md:text-base text-gray-400 line-through mb-1">
          De {originalPrice}
        </div>
      )}
      <div className="flex items-baseline gap-2">
        <span className="text-sm md:text-lg text-gray-300">Por apenas</span>
        <motion.span
          className="text-3xl md:text-5xl font-bold text-[#4ADE80]"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          {price}
        </motion.span>
      </div>
      <div className="text-xs md:text-sm text-gray-400 mt-1">
        Pagamento único • Sem mensalidade
      </div>
    </motion.div>
  );
};

export default PriceDisplay;

