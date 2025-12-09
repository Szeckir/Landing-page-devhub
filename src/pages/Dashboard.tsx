import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserData } from '../lib/api';
import { supabase } from '../lib/supabase';
import { FaCheckCircle, FaBookOpen, FaLink, FaSignOutAlt, FaHome } from 'react-icons/fa';

interface UserData {
  email: string;
  hasPurchased: boolean;
  subscriptionStatus: string;
}

const Dashboard = () => {
  const { user, session, signOut } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !session?.access_token) {
        setLoading(false);
        return;
      }

      try {
        // Buscar dados através da API backend (seguro)
        const data = await getUserData(session.access_token);
        setUserData(data);
        setBackendError(false);
      } catch (error: any) {
        console.error('Error fetching user data:', error);
        
        // Se o backend não estiver disponível, usar fallback (apenas desenvolvimento)
        if (error.message === 'BACKEND_NOT_AVAILABLE') {
          setBackendError(true);
          console.warn('⚠️ Backend não disponível. Usando fallback (menos seguro).');
          
          // Fallback: query direta ao Supabase
          try {
            const { data, error: dbError } = await supabase
              .from('users')
              .select('email, has_purchased_roadmap, subscription_status')
              .eq('id', user.id)
              .single();

            if (dbError) {
              console.error('Fallback query error:', dbError);
              setUserData({
                email: user.email || '',
                hasPurchased: false,
                subscriptionStatus: 'inactive'
              });
            } else {
              setUserData({
                email: data?.email || user.email || '',
                hasPurchased: data?.has_purchased_roadmap ?? false,
                subscriptionStatus: data?.subscription_status || 'inactive'
              });
            }
          } catch (fallbackError) {
            console.error('Fallback failed:', fallbackError);
            setUserData({
              email: user.email || '',
              hasPurchased: false,
              subscriptionStatus: 'inactive'
            });
          }
        } else {
          setUserData({
            email: user.email || '',
            hasPurchased: false,
            subscriptionStatus: 'inactive'
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, session]);

  const handleSignOut = async () => {
    await signOut();
  };

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

  const displayName = user?.user_metadata?.full_name || 
                     user?.user_metadata?.name || 
                     user?.email?.split('@')[0] || 
                     'Usuário';

  return (
    <div className="min-h-screen bg-[#1B1C1D]">
      {/* Header */}
      <header className="bg-[#1B1C1D]/95 backdrop-blur-sm shadow-lg border-b border-gray-800">
        <div className="container-custom py-4 flex justify-between items-center">
          <Link to="/" className="text-[#4ADE80] font-bold text-xl md:text-2xl">
            Algoritmo&Cafe
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-white hover:text-[#4ADE80] transition-colors flex items-center gap-2"
            >
              <FaHome />
              <span className="hidden sm:inline">Início</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="text-white hover:text-[#4ADE80] transition-colors flex items-center gap-2"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {backendError && (
            <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
              <p className="text-yellow-400 text-sm">
                ⚠️ <strong>Backend não disponível.</strong> Usando modo de desenvolvimento (menos seguro).
                <br />
                Para produção, inicie o backend: <code className="text-xs bg-gray-800 px-2 py-1 rounded">cd backend && npm run dev</code>
              </p>
            </div>
          )}
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Olá, </span>
              <span className="text-gradient">{displayName}</span>
            </h1>
            <p className="text-lg text-gray-300">
              Bem-vindo à sua área de membros do DevHub
            </p>
          </div>

          {/* Status Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <FaCheckCircle className="text-[#4ADE80] text-3xl" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-2">
                  Status da Assinatura
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">Plano:</span>
                    <span className="text-[#4ADE80] font-semibold">DevHub Completo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">Status:</span>
                    <span className="text-[#4ADE80] font-semibold">
                      {userData?.hasPurchased ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">Email:</span>
                    <span className="text-white">{userData?.email || user?.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              <span className="text-white">Aqui estão seus </span>
              <span className="text-gradient">produtos</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* DevHub Product Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-[#4ADE80] transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#4ADE80] to-green-600 flex items-center justify-center">
                      <FaBookOpen className="text-black text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">DevHub</h3>
                      <p className="text-sm text-gray-400">Central de Recursos</p>
                    </div>
                  </div>
                  {userData?.hasPurchased && (
                    <span className="px-3 py-1 bg-[#4ADE80]/20 text-[#4ADE80] rounded-full text-sm font-semibold">
                      Ativo
                    </span>
                  )}
                </div>
                <p className="text-gray-300 mb-4">
                  Acesso completo a milhares de recursos organizados, ferramentas de IA, APIs gratuitas, 
                  anotações de programação e muito mais.
                </p>
                {userData?.hasPurchased ? (
                  <a
                    href="https://www.notion.so/seu-link-do-devhub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2 w-full justify-center"
                  >
                    <FaLink />
                    Acessar Conteúdo
                  </a>
                ) : (
                  <a
                    href="https://pay.hotmart.com/J96549882U?checkoutMode=2"
                    className="btn-primary inline-flex items-center gap-2 w-full justify-center"
                  >
                    Comprar Agora
                  </a>
                )}
              </div>

              {/* Future Products Placeholder */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 border-dashed opacity-60">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center">
                      <FaBookOpen className="text-gray-500 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-400">Em Breve</h3>
                      <p className="text-sm text-gray-500">Novos produtos</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">
                  Novos produtos e recursos serão adicionados em breve.
                </p>
                <button
                  disabled
                  className="px-6 py-3 bg-gray-700 text-gray-500 rounded-xl cursor-not-allowed w-full"
                >
                  Em Breve
                </button>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-gradient-to-r from-[#4ADE80]/10 to-green-600/10 rounded-xl p-6 border border-[#4ADE80]/20">
            <h3 className="text-lg font-bold text-white mb-2">
              💡 Dicas
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Seu acesso é vitalício - aproveite todas as atualizações futuras</li>
              <li>• O conteúdo é atualizado constantemente com novos recursos</li>
              <li>• Em breve teremos uma comunidade completa com chat e fórum</li>
              <li>• Dúvidas? Entre em contato através do email de suporte</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

