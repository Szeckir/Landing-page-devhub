import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserData } from '../lib/api';
import { supabase } from '../lib/supabase';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

interface UserData {
  email: string;
  hasPurchased: boolean;
  subscriptionStatus: string;
}

const Profile = () => {
  const { user, session } = useAuth();
  const navigate = useNavigate();
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
        const data = await getUserData(session.access_token);
        setUserData(data);
        setBackendError(false);
      } catch (error: any) {
        console.error('Error fetching user data:', error);
        
        if (error.message === 'BACKEND_NOT_AVAILABLE') {
          setBackendError(true);
          console.warn('⚠️ Backend não disponível. Usando fallback (menos seguro).');
          
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

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

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
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/membros')}
            className="mb-6 flex items-center gap-2 text-gray-300 hover:text-[#4ADE80] transition-colors"
          >
            <FaArrowLeft />
            <span>Voltar</span>
          </button>

          {backendError && (
            <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
              <p className="text-yellow-400 text-sm">
                ⚠️ <strong>Backend não disponível.</strong> Usando modo de desenvolvimento (menos seguro).
                <br />
                Para produção, inicie o backend: <code className="text-xs bg-gray-800 px-2 py-1 rounded">cd backend && npm run dev</code>
              </p>
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Perfil de </span>
              <span className="text-gradient">{displayName}</span>
            </h1>
            <p className="text-lg text-gray-300">
              Gerencie suas informações e assinatura
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
        </div>
      </div>
    </div>
  );
};

export default Profile;

