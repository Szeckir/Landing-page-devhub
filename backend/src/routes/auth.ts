import { Router, Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables:', {
    hasUrl: !!supabaseUrl,
    hasServiceKey: !!supabaseServiceKey,
    envKeys: Object.keys(process.env).filter(k => k.includes('SUPABASE'))
  });
  throw new Error('Missing Supabase environment variables. Please configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your Vercel project settings.');
}

// Create Supabase client with service role key (bypasses RLS)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Verifica o acesso do usuário autenticado
 * POST /api/auth/check-access
 * 
 * Headers:
 * - Authorization: Bearer <jwt_token>
 */
router.post('/check-access', async (req: Request, res: Response) => {
  try {
    // Obter token do header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'Missing or invalid authorization header' 
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verificar e decodificar o token usando Supabase
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'Invalid or expired token' 
      });
    }

    // Buscar dados do usuário usando Service Role (bypass RLS)
    const { data: userData, error: dbError } = await supabaseAdmin
      .from('users')
      .select('has_purchased_devhub, subscription_status')
      .eq('id', user.id)
      .single();

    if (dbError) {
      // Se o usuário não existe na tabela, criar registro
      if (dbError.code === 'PGRST116') {
        const { data: newUser, error: createError } = await supabaseAdmin
          .from('users')
          .insert({
            id: user.id,
            email: user.email || '',
            has_purchased_devhub: false,
            subscription_status: 'inactive'
          })
          .select('has_purchased_devhub, subscription_status')
          .single();

        if (createError) {
          console.error('Error creating user record:', createError);
          return res.status(500).json({ error: 'Error creating user record' });
        }

        return res.json({
          hasAccess: false,
          hasPurchased: false,
          subscriptionStatus: 'inactive'
        });
      }

      console.error('Error fetching user data:', dbError);
      return res.status(500).json({ error: 'Error fetching user data' });
    }

    // Retornar apenas informações necessárias (não expor dados sensíveis)
    return res.json({
      hasAccess: userData?.has_purchased_devhub === true,
      hasPurchased: userData?.has_purchased_devhub === true,
      subscriptionStatus: userData?.subscription_status || 'inactive'
    });

  } catch (error) {
    console.error('Error checking access:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Obtém dados básicos do usuário (apenas para exibição)
 * POST /api/auth/user-data
 */
router.post('/user-data', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'Missing or invalid authorization header' 
      });
    }

    const token = authHeader.substring(7);

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'Invalid or expired token' 
      });
    }

    const { data: userData, error: dbError } = await supabaseAdmin
      .from('users')
      .select('email, has_purchased_devhub, subscription_status')
      .eq('id', user.id)
      .single();

    if (dbError) {
      return res.status(500).json({ error: 'Error fetching user data' });
    }

    // Retornar apenas dados necessários para exibição
    return res.json({
      email: userData?.email || user.email,
      hasPurchased: userData?.has_purchased_devhub === true,
      subscriptionStatus: userData?.subscription_status || 'inactive'
    });

  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;

