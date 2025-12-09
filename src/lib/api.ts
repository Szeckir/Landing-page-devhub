/**
 * API Client para comunicação com o backend
 * Todas as verificações de acesso devem passar pelo backend para segurança
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface CheckAccessResponse {
  hasAccess: boolean;
  hasPurchased: boolean;
  subscriptionStatus: string;
}

interface UserDataResponse {
  email: string;
  hasPurchased: boolean;
  subscriptionStatus: string;
}

/**
 * Verifica se o usuário tem acesso ao conteúdo
 * @param token JWT token do Supabase
 * @returns Informações de acesso do usuário
 */
export const checkAccess = async (token: string): Promise<CheckAccessResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/check-access`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Invalid or expired token');
      }
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    // Se for erro de conexão, lançar erro específico
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('BACKEND_NOT_AVAILABLE');
    }
    throw error;
  }
};

/**
 * Obtém dados do usuário para exibição
 * @param token JWT token do Supabase
 * @returns Dados do usuário
 */
export const getUserData = async (token: string): Promise<UserDataResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/user-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Invalid or expired token');
      }
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    // Se for erro de conexão, lançar erro específico
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('BACKEND_NOT_AVAILABLE');
    }
    throw error;
  }
};

