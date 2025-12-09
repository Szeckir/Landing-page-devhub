import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import webhookRoutes from './routes/webhooks.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: [
    'https://algoritmoecafe.com',
    'https://www.algoritmoecafe.com',
    'https://devhub-szeckir.vercel.app',
    /^https:\/\/devhub-.*\.vercel\.app$/,
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth routes (protected endpoints)
app.use('/api/auth', authRoutes);

// Webhook routes
app.use('/api/webhooks', webhookRoutes);

// Start server apenas se não estiver rodando no Vercel
// No Vercel, o servidor é iniciado automaticamente
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app;

