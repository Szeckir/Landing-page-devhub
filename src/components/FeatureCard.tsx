import React from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0 
}) => {
  return (
    <motion.div
      className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-[#4ADE80] group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="p-3 bg-gradient-to-br from-[#4ADE80] to-green-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
            <Icon className="text-2xl text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-[#4ADE80] transition-colors">
            {title}
          </h3>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;

