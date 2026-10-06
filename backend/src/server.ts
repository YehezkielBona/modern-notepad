import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './config/prisma.js';
import apiRoutes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Basic root route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Modern Notepad API',
    docs: '/api/health',
  });
});

// Health check route
app.get('/api/health', async (_req: Request, res: Response) => {
  try {
    // Test Neon Database connection
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'ok',
      message: 'Backend & Neon Database connected successfully!',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed. Please ensure your DATABASE_URL in .env is valid.',
      error: (error as Error).message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Modern Notepad Backend running on http://localhost:${PORT}`);
});
