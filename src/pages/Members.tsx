import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { checkAccess } from '../lib/api';
import { supabase } from '../lib/supabase';
import Dashboard from './Dashboard';

const Members = () => {
  const { user, session, loading } = useAuth();
  const [hasPurchase, setHasPurchase] = useState<boolean | null>(null);
  const [checkingPurchase, setCheckingPurchase] = useState(true);
  const [backendError, setBackendError] = useState(false);

  useEffect(() => {
    const checkPurchase = async () => {
      if (!user || !session?.access_token) {
        setCheckingPurchase(false);
        return;
      }

      try {
        // Verificar acesso através da API backend (seguro)
        const accessData = await checkAccess(session.access_token);
        setHasPurchase(accessData.hasAccess);
        setBackendError(false);
      } catch (error: any) {
        console.error('Error checking purchase:', error);
        
        // Se o backend não estiver disponível, usar fallback (apenas desenvolvimento)
        if (error.message === 'BACKEND_NOT_AVAILABLE') {
          setBackendError(true);
          console.warn('⚠️ Backend não disponível. Usando fallback (menos seguro).');
          
          // Fallback: query direta ao Supabase (apenas para desenvolvimento)
          // ⚠️ ATENÇÃO: Isso é menos seguro e só deve ser usado em desenvolvimento
          try {
            const { data, error: dbError } = await supabase
              .from('users')
              .select('has_purchased_roadmap')
              .eq('id', user.id)
              .single();

            if (dbError) {
              console.error('Fallback query error:', dbError);
              setHasPurchase(false);
            } else {
              setHasPurchase(data?.has_purchased_roadmap ?? false);
            }
          } catch (fallbackError) {
            console.error('Fallback failed:', fallbackError);
            setHasPurchase(false);
          }
        } else {
          setHasPurchase(false);
        }
      } finally {
        setCheckingPurchase(false);
      }
    };

    checkPurchase();
  }, [user, session]);

  if (loading || checkingPurchase) {
    return (
      <div className="min-h-screen bg-[#1B1C1D] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ADE80] mb-4"></div>
          <p className="text-gray-300">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!hasPurchase) {
    return (
      <div className="min-h-screen bg-[#1B1C1D] flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-2xl">
            {backendError && (
              <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
                <p className="text-yellow-400 text-sm">
                  ⚠️ <strong>Backend não disponível.</strong> Usando modo de desenvolvimento (menos seguro).
                  <br />
                  Para produção, inicie o backend: <code className="text-xs">cd backend && npm run dev</code>
                </p>
              </div>
            )}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-900/20 mb-4">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Acesso Restrito
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Olá, <span className="text-[#4ADE80] font-semibold">{user.email}</span>!
            </p>
            <p className="text-lg text-gray-300 mb-8">
              Você precisa adquirir o DevHub para acessar esta área. Após a compra, seu acesso será liberado automaticamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/auth?redirect=checkout" 
                className="btn-primary-lg inline-block"
              >
                Comprar Agora
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors"
              >
                Verificar Acesso
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Já comprou? Aguarde alguns minutos e clique em "Verificar Acesso" ou faça logout e login novamente.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <Dashboard />;
};

export default Members;

