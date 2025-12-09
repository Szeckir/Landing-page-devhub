import { Router, Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BULK_UPDATE_SECRET = process.env.BULK_UPDATE_SECRET || 'change-this-secret';

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Endpoint temporário para atualizar múltiplos usuários de uma vez
 * POST /api/bulk-update
 * 
 * Body:
 * {
 *   "secret": "sua-senha-secreta",
 *   "emails": ["email1@exemplo.com", "email2@exemplo.com", ...]
 * }
 */
router.post('/bulk-update', async (req: Request, res: Response) => {
  try {
    const { secret, emails } = req.body;

    // Verificar senha secreta
    if (secret !== BULK_UPDATE_SECRET) {
      return res.status(401).json({ error: 'Unauthorized - Invalid secret' });
    }

    // Validar entrada
    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ error: 'emails must be a non-empty array' });
    }

    console.log(`Starting bulk update for ${emails.length} emails`);

    const results = {
      success: [] as string[],
      notFound: [] as string[],
      errors: [] as { email: string; error: string }[],
    };

    // Buscar todos os usuários de uma vez
    const { data: authUsers, error: authError } = await supabaseAdmin.auth.admin.listUsers();

    if (authError) {
      console.error('Error fetching auth users:', authError);
      return res.status(500).json({ error: 'Error fetching users' });
    }

    // Processar cada email
    for (const email of emails) {
      try {
        const user = authUsers.users.find(u => u.email?.toLowerCase() === email.toLowerCase());

        if (!user) {
          results.notFound.push(email);
          console.log(`User not found: ${email}`);
          continue;
        }

        // Atualizar ou criar registro na tabela users
        const { data, error } = await supabaseAdmin
          .from('users')
          .upsert({
            id: user.id,
            email: email,
            has_purchased_roadmap: true,
            subscription_status: 'active',
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'id',
          })
          .select()
          .single();

        if (error) {
          console.error(`Error updating ${email}:`, error);
          results.errors.push({ email, error: error.message });
        } else {
          results.success.push(email);
          console.log(`✅ Updated access for ${email}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Error processing ${email}:`, errorMessage);
        results.errors.push({ email, error: errorMessage });
      }
    }

    console.log(`Bulk update completed: ${results.success.length} success, ${results.notFound.length} not found, ${results.errors.length} errors`);

    return res.status(200).json({
      message: 'Bulk update completed',
      summary: {
        total: emails.length,
        success: results.success.length,
        notFound: results.notFound.length,
        errors: results.errors.length,
      },
      results,
    });
  } catch (error) {
    console.error('Error in bulk update:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;

