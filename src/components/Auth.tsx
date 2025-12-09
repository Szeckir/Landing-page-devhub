import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

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
  const HOTMART_CHECKOUT_URL = 'https://pay.hotmart.com/J96549882U?checkoutMode=2';

  useEffect(() => {
    if (!loading && user) {
      if (redirectToCheckout) {
        // Redirecionar para Hotmart após autenticação bem-sucedida
        window.location.href = HOTMART_CHECKOUT_URL;
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

  return (
    <div className="min-h-screen bg-[#1B1C1D] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-white">Bem-vindo ao </span>
            <span className="text-gradient">DevHub</span>
          </h1>
          <p className="text-gray-300">Entre para acessar sua área de membros</p>
        </div>
        
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
      </div>
    </div>
  );
};

