import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { checkAccess } from '../lib/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requirePurchase?: boolean;
}

export const ProtectedRoute = ({ children, requirePurchase = true }: ProtectedRouteProps) => {
  const { user, session, loading } = useAuth();
  const [hasPurchase, setHasPurchase] = useState<boolean | null>(null);
  const [checkingPurchase, setCheckingPurchase] = useState(true);

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
      } catch (error: any) {
        console.error('Error checking purchase:', error);
        // Em caso de erro, negar acesso por segurança
        setHasPurchase(false);
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

  if (requirePurchase && !hasPurchase) {
    return <Navigate to="/membros/no-access" replace />;
  }

  return <>{children}</>;
};

