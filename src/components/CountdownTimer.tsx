import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutos em segundos

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Reinicia o timer quando chega a zero
          return 20 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-xs md:text-sm text-gray-400 mb-2 font-semibold uppercase tracking-wider">
        Oferta expira em:
      </div>
      <div className="flex gap-2 md:gap-4 items-center">
        <motion.div
          className="bg-gradient-to-br from-red-600 to-orange-600 rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px] text-center shadow-lg"
          animate={{
            scale: timeLeft <= 60 ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 1,
            repeat: timeLeft <= 60 ? Infinity : 0,
          }}
        >
          <div className="text-2xl md:text-4xl font-bold text-white">
            {String(minutes).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm text-red-100 mt-1">MIN</div>
        </motion.div>
        <div className="text-2xl md:text-4xl font-bold text-red-500">:</div>
        <motion.div
          className="bg-gradient-to-br from-red-600 to-orange-600 rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px] text-center shadow-lg"
          animate={{
            scale: timeLeft <= 10 ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 0.5,
            repeat: timeLeft <= 10 ? Infinity : 0,
          }}
        >
          <div className="text-2xl md:text-4xl font-bold text-white">
            {String(seconds).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm text-red-100 mt-1">SEG</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CountdownTimer;

