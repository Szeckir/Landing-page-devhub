import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExclamationTriangle, FaCheckCircle, FaEnvelope } from 'react-icons/fa';

interface HotmartCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

const HotmartCheckoutModal: React.FC<HotmartCheckoutModalProps> = ({ 
  isOpen, 
  onClose, 
  userEmail 
}) => {
  const [showCheckout, setShowCheckout] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowCheckout(false);
    }
  }, [isOpen]);

  const handleConfirmEmail = () => {
    setShowCheckout(true);
  };

  const handleOpenHotmart = () => {
    const HOTMART_URL = 'https://pay.hotmart.com/J96549882U?checkoutMode=2';
    
    // Abrir checkout da Hotmart em nova aba
    // O checkoutMode=2 fará a Hotmart abrir em modo lightbox na nova aba
    window.open(HOTMART_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 max-w-lg w-full pointer-events-auto overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#4ADE80]/20 to-transparent p-6 border-b border-gray-700 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-full"
                >
                  <FaTimes size={20} />
                </button>
                <h2 className="text-2xl font-bold text-white">
                  🎉 Quase lá!
                </h2>
                <p className="text-gray-300 mt-1">
                  Complete seu pagamento para acessar o DevHub
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {!showCheckout ? (
                  /* Email Warning Section */
                  <div className="space-y-6">
                    {/* Important Notice */}
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
                      <div className="flex items-start gap-4">
                        <div className="bg-amber-500/20 p-3 rounded-full">
                          <FaExclamationTriangle className="text-amber-400 text-xl" />
                        </div>
                        <div>
                          <h3 className="text-amber-400 font-bold text-lg mb-2">
                            Atenção Importante!
                          </h3>
                          <p className="text-gray-300 leading-relaxed">
                            Para que seu acesso seja liberado automaticamente, você 
                            <strong className="text-white"> DEVE usar o mesmo email </strong> 
                            do cadastro no momento do pagamento.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* User Email Display */}
                    <div className="bg-gray-800/50 border border-gray-600 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <FaEnvelope className="text-[#4ADE80]" />
                        <span className="text-gray-400 text-sm">Seu email cadastrado:</span>
                      </div>
                      <div className="bg-gray-900/80 rounded-lg px-4 py-3 border border-[#4ADE80]/30">
                        <p className="text-[#4ADE80] font-mono text-lg font-semibold break-all">
                          {userEmail}
                        </p>
                      </div>
                      <p className="text-gray-400 text-sm mt-3">
                        📋 Copie este email e use na página de pagamento
                      </p>
                    </div>

                    {/* Checklist */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <FaCheckCircle className="text-[#4ADE80]" />
                        <span>Acesso imediato após confirmação do pagamento</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <FaCheckCircle className="text-[#4ADE80]" />
                        <span>Garantia de 7 dias - sem risco</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <FaCheckCircle className="text-[#4ADE80]" />
                        <span>Pagamento 100% seguro via Hotmart</span>
                      </div>
                    </div>

                    {/* Confirm Button */}
                    <button
                      onClick={handleConfirmEmail}
                      className="w-full bg-gradient-to-r from-[#4ADE80] to-[#22c55e] text-black font-bold py-4 px-6 rounded-xl hover:from-[#22c55e] hover:to-[#16a34a] transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-[#4ADE80]/20"
                    >
                      ✓ Entendi, vou usar o mesmo email
                    </button>

                    <p className="text-center text-gray-500 text-sm">
                      Ao clicar, você confirma que usará o email{' '}
                      <strong className="text-gray-400">{userEmail}</strong> no checkout
                    </p>
                  </div>
                ) : (
                  /* Checkout Section */
                  <div className="space-y-6">
                    {/* Reminder Banner */}
                    <div className="bg-[#4ADE80]/10 border border-[#4ADE80]/30 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="text-[#4ADE80]" />
                        <div>
                          <p className="text-gray-300 text-sm">
                            Lembre-se de usar este email:
                          </p>
                          <p className="text-[#4ADE80] font-semibold">{userEmail}</p>
                        </div>
                      </div>
                    </div>

                    {/* Hotmart Button */}
                    <div className="text-center">
                      <button
                        onClick={handleOpenHotmart}
                        className="w-full bg-gradient-to-r from-[#4ADE80] to-[#22c55e] text-black font-bold py-5 px-8 rounded-xl transition-all duration-300 transform shadow-lg shadow-[#4ADE80]/30 text-lg hover:from-[#22c55e] hover:to-[#16a34a] hover:scale-[1.02]"
                      >
                        🔒 FINALIZAR COMPRA - R$ 19,90
                      </button>
                    </div>

                    <p className="text-center text-gray-400 text-sm">
                      O checkout da Hotmart abrirá em uma nova janela
                    </p>

                    {/* Back Button */}
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="w-full text-gray-400 hover:text-white py-2 transition-colors text-sm"
                    >
                      ← Voltar para as instruções
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HotmartCheckoutModal;

