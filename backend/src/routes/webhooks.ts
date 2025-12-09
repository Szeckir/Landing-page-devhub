import { Router, Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface HotmartWebhookPayload {
  data?: {
    buyer?: {
      email?: string;
    };
    product?: {
      id?: string;
    };
    purchase?: {
      status?: string;
    };
  };
  event?: string;
  // Hotmart 2.0.0 pode enviar em formatos diferentes
  buyer?: {
    email?: string;
  };
  product?: {
    id?: string;
  };
}

/**
 * Webhook endpoint for Hotmart purchase notifications
 * POST /api/webhooks/hotmart
 * 
 * Suporta diferentes formatos de payload da Hotmart:
 * - Formato 1: { data: { buyer: { email } } }
 * - Formato 2: { buyer: { email } }
 */
router.post('/hotmart', async (req: Request, res: Response) => {
  try {
    const payload: HotmartWebhookPayload = req.body;

    console.log('Received Hotmart webhook:', JSON.stringify(payload, null, 2));

    // Extract email from payload - suporta diferentes formatos
    // Formato 1: payload.data.buyer.email (formato aninhado)
    // Formato 2: payload.buyer.email (formato direto)
    const email = payload.data?.buyer?.email || payload.buyer?.email;

    if (!email) {
      console.error('No email found in webhook payload');
      return res.status(400).json({ 
        error: 'Email not found in webhook payload',
        received: payload 
      });
    }

    // Check if user exists in auth.users by email
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('Error fetching auth users:', authError);
      return res.status(500).json({ error: 'Error fetching users' });
    }

    const user = authUsers.users.find(u => u.email === email);

    if (!user) {
      console.log(`User with email ${email} not found in auth.users. They will be created when they sign up.`);
      // Optionally, you could create a pending purchase record here
      return res.status(200).json({ 
        message: 'User not found in auth, will be processed on signup',
        email 
      });
    }

    // Update user's purchase status in the users table
    const { data, error } = await supabase
      .from('users')
      .update({ 
        has_purchased_roadmap: true,
        subscription_status: 'active',
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user purchase status:', error);
      
      // If user doesn't exist in users table, create it
      if (error.code === 'PGRST116') {
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: email,
            has_purchased_roadmap: true,
            subscription_status: 'active'
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating user record:', createError);
          return res.status(500).json({ error: 'Error creating user record' });
        }

        console.log(`✅ Created user record and granted access for ${email}`);
        return res.status(200).json({ 
          message: 'User created and access granted',
          user: newUser 
        });
      }

      return res.status(500).json({ error: 'Error updating user purchase status' });
    }

    console.log(`✅ Updated purchase status for user ${email}`);
    return res.status(200).json({ 
      message: 'Purchase status updated successfully',
      user: data 
    });

  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;

