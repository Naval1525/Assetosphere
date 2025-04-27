import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import all routes
import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import planRoutes from './routes/planRoutes.js';
import purchaseRoutes from './routes/purchaseRoutes.js';
import billRoutes from './routes/billRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import claimRoutes from './routes/claimRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './utils/error.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection failed:', err));

// API Routes
app.use('/api/auth', authRoutes);                    // Authentication routes
app.use('/api/companies', companyRoutes);            // Company management routes
app.use('/api/plans', planRoutes);                   // Warranty plan routes
app.use('/api/purchases', purchaseRoutes);           // Purchase management routes
app.use('/api/bills', billRoutes);                   // Billing routes
app.use('/api/user', dashboardRoutes);               // User dashboard routes
app.use('/api/users', userRoutes);                   // User management routes
app.use('/api/claims', claimRoutes);                 // Claims routes

// Health check route
app.get('/', (req, res) => res.json({ 
  message: '🚀 Server running',
  version: '1.0.0',
  status: 'healthy'
}));

// Error handling middleware
app.use(errorHandler);

// 404 Route handler
app.use((req, res) => {
  res.status(404).json({ 
    message: '404 - Route not found',
    path: req.path,
    method: req.method
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌐 Server listening on http://localhost:${PORT}`);
  console.log('📡 Available Routes:');
  console.log('   - /api/auth/*');
  console.log('   - /api/companies/*');
  console.log('   - /api/plans/*');
  console.log('   - /api/purchases/*');
  console.log('   - /api/bills/*');
  console.log('   - /api/user/*');
  console.log('   - /api/users/*');
});
