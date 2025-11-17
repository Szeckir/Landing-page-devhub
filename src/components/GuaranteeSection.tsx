import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt } from 'react-icons/fa';

const GuaranteeSection: React.FC = () => {
  return (
    <motion.section
      className="py-12 md:py-16 bg-gradient-to-br from-gray-800 to-gray-900 border-y border-gray-700"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center justify-center mb-6"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div className="p-4 bg-gradient-to-br from-green-600 to-[#4ADE80] rounded-full">
              <FaShieldAlt className="text-3xl md:text-4xl text-white" />
            </div>
          </motion.div>
          <motion.h2
            className="text-2xl md:text-4xl font-bold text-white mb-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Garantia de 7 Dias
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Teste, explore, use. Se não for para você, devolvemos 100% do seu dinheiro.
            <br />
            <span className="text-[#4ADE80] font-semibold">Sem letra miúda. Sem enrolação.</span>
          </motion.p>
          <motion.div
            className="inline-block px-6 py-3 bg-gray-700 rounded-lg border border-gray-600"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm md:text-base text-gray-300">
              <span className="font-semibold text-white">Política de Reembolso:</span> Você tem 7 dias após a compra para solicitar o reembolso integral.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default GuaranteeSection;

