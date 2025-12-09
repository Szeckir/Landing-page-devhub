/**
 * Vercel Serverless Function Entry Point
 * Este arquivo é usado quando o backend é deployado no Vercel
 */

import app from '../src/server.js';

// Exportar como handler para Vercel
export default app;

