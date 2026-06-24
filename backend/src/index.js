import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';

// Import routes
import orgRoutes from './routes/orgRoutes.js';
import authRoutes from './routes/authRoutes.js';
import featureFlagRoutes from './routes/featureFlagRoutes.js';

const app = express();

// Connect to database
connectDB().catch((err) => {
  console.error('Database connection failed:', err.message);
  console.log('Server continuing without database - API routes available for testing');
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging (optional)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Feature Flags API', version: '1.0.0', status: 'running' });
});

// Routes (NO /api prefix - Vercel handles /api routing)
app.use('/org', orgRoutes);
app.use('/auth', authRoutes);
app.use('/feature', featureFlagRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server for local development (only when this file is executed directly)
// For Vercel, the app is imported in /api/index.js and exported as a handler
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
