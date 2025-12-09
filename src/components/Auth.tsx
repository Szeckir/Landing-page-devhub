import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';

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

export const AuthComponent = () => {
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
            redirectTo={`${window.location.origin}/membros`}
            onlyThirdPartyProviders={false}
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

