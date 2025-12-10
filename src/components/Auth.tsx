import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import HotmartCheckoutModal from './HotmartCheckoutModal';

const customTheme = {
  ...ThemeSupa,
  default: {
    ...ThemeSupa.default,
    colors: {
      ...ThemeSupa.default.colors,
      brand: '#4ADE80',
      brandAccent: '#22c55e',
      brandButtonText: '#000000',
      defaultButtonBackground: '#374151',
      defaultButtonBackgroundHover: '#4B5563',
      defaultButtonBorder: '#4B5563',
      defaultButtonText: '#ffffff',
      dividerBackground: '#374151',
      inputBackground: '#1F2937',
      inputBorder: '#374151',
      inputBorderHover: '#4B5563',
      inputBorderFocus: '#4ADE80',
      inputText: '#ffffff',
      inputLabelText: '#D1D5DB',
      inputPlaceholder: '#9CA3AF',
      messageText: '#D1D5DB',
      messageTextDanger: '#EF4444',
      anchorTextColor: '#4ADE80',
      anchorTextHoverColor: '#22c55e',
    },
    space: {
      ...ThemeSupa.default.space,
      spaceSmall: '8px',
      spaceMedium: '16px',
      spaceLarge: '24px',
    },
    fontSizes: {
      ...ThemeSupa.default.fontSizes,
      baseBodySize: '16px',
      baseInputSize: '16px',
    },
    radii: {
      ...ThemeSupa.default.radii,
      borderRadiusButton: '12px',
      buttonBorderRadius: '12px',
      inputBorderRadius: '8px',
    },
  },
};

const portugueseLocalization = {
  variables: {
    sign_in: {
      email_label: 'Endereço de e-mail',
      password_label: 'Sua senha',
      email_input_placeholder: 'Seu endereço de e-mail',
      password_input_placeholder: 'Sua senha',
      button_label: 'Entrar',
      social_provider_text: 'Entrar com {{provider}}',
      link_text: 'Já tem uma conta? Entre',
      loading_button_label: 'Entrando...',
    },
    sign_up: {
      email_label: 'Endereço de e-mail',
      password_label: 'Sua senha',
      email_input_placeholder: 'Seu endereço de e-mail',
      password_input_placeholder: 'Sua senha',
      button_label: 'Cadastrar',
      social_provider_text: 'Cadastrar com {{provider}}',
      link_text: 'Não tem uma conta? Cadastre-se',
      loading_button_label: 'Cadastrando...',
      confirmation_text: 'Verifique seu e-mail para confirmar sua conta',
    },
    forgotten_password: {
      email_label: 'Endereço de e-mail',
      email_input_placeholder: 'Seu endereço de e-mail',
      button_label: 'Enviar instruções de redefinição',
      link_text: 'Esqueceu sua senha?',
      loading_button_label: 'Enviando instruções...',
      confirmation_text: 'Verifique seu e-mail para redefinir sua senha',
    },
    magic_link: {
      email_input_label: 'Endereço de e-mail',
      email_input_placeholder: 'Seu endereço de e-mail',
      button_label: 'Enviar link mágico',
      link_text: 'Enviar um link mágico por e-mail',
      loading_button_label: 'Enviando link mágico...',
      confirmation_text: 'Verifique seu e-mail para o link mágico',
    },
    update_password: {
      password_label: 'Nova senha',
      password_input_placeholder: 'Sua nova senha',
      button_label: 'Atualizar senha',
      loading_button_label: 'Atualizando senha...',
      confirmation_text: 'Sua senha foi atualizada',
    },
  },
};

export const AuthComponent = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const redirectToCheckout = searchParams.get('redirect') === 'checkout';
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      if (redirectToCheckout) {
        // Abrir modal do Hotmart após autenticação bem-sucedida
        setShowCheckoutModal(true);
      } else {
        // Comportamento padrão: redirecionar para área de membros
        navigate('/membros', { replace: true });
      }
    }
  }, [user, loading, navigate, redirectToCheckout]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1B1C1D] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ADE80] mb-4"></div>
          <p className="text-gray-300">Carregando...</p>
        </div>
      </div>
    );
  }

  const handleCloseModal = () => {
    setShowCheckoutModal(false);
    // Após fechar a modal, navegar para área de membros
    navigate('/membros', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#1B1C1D] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Show different content based on checkout flow */}
        {user && redirectToCheckout ? (
          /* Checkout Flow - User is logged in and needs to pay */
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-white">Parabéns pelo </span>
                <span className="text-gradient">Cadastro!</span>
              </h1>
              <p className="text-gray-300">Agora finalize seu pagamento para acessar o DevHub</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-2xl">
              <div className="mb-6">
                <div className="w-20 h-20 bg-[#4ADE80]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-[#4ADE80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-lg mb-2">Conta criada com sucesso!</p>
                <p className="text-gray-400 text-sm">
                  Email: <span className="text-[#4ADE80]">{user.email}</span>
                </p>
              </div>
              
              <button
                onClick={() => setShowCheckoutModal(true)}
                className="w-full bg-gradient-to-r from-[#4ADE80] to-[#22c55e] text-black font-bold py-4 px-6 rounded-xl hover:from-[#22c55e] hover:to-[#16a34a] transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-[#4ADE80]/20"
              >
                🚀 Finalizar Pagamento - R$ 19,90
              </button>
              
              <button
                onClick={() => navigate('/membros', { replace: true })}
                className="mt-4 text-gray-400 hover:text-white text-sm transition-colors"
              >
                Ir para área de membros →
              </button>
            </div>
          </div>
        ) : (
          /* Normal Auth Flow */
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-white">Bem-vindo ao </span>
                <span className="text-gradient">DevHub</span>
              </h1>
              <p className="text-gray-300">
                {redirectToCheckout 
                  ? 'Crie sua conta para finalizar a compra' 
                  : 'Entre para acessar sua área de membros'}
              </p>
            </div>
            
            {/* Important notice for checkout flow */}
            {redirectToCheckout && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 text-xl">⚠️</span>
                  <div>
                    <p className="text-amber-400 font-semibold text-sm mb-1">Importante!</p>
                    <p className="text-gray-300 text-sm">
                      Use o <strong className="text-white">mesmo email</strong> no cadastro e no pagamento 
                      para liberar seu acesso automaticamente.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-2xl">
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: customTheme }}
                providers={['github']}
                providerScopes={{
                  github: 'read:user user:email',
                }}
                theme="dark"
                redirectTo={redirectToCheckout 
                  ? `${window.location.origin}/auth?redirect=checkout`
                  : `${window.location.origin}/membros`}
                onlyThirdPartyProviders={false}
                localization={portugueseLocalization}
              />
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Ao entrar, você concorda com nossos{' '}
                <a href="#" className="text-[#4ADE80] hover:underline">Termos de Uso</a>
                {' '}e{' '}
                <a href="#" className="text-[#4ADE80] hover:underline">Política de Privacidade</a>
              </p>
            </div>
          </>
        )}
      </div>
      
      {/* Hotmart Checkout Modal */}
      <HotmartCheckoutModal
        isOpen={showCheckoutModal}
        onClose={handleCloseModal}
        userEmail={user?.email || ''}
      />
    </div>
  );
};

