// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // require('dotenv').config();

// // const authRoutes = require('./routes/authRoutes');
// // const billRoutes = require('./routes/billRoutes'); // If you have this
// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // // 🟦 CORS config for localhost:5173 (Vite frontend)
// // app.use(cors({
// //   origin: 'http://localhost:5173',
// //   credentials: true,
// // }));

// // app.use(express.json());

// // mongoose.connect(process.env.MONGO_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // })
// // .then(() => console.log('✅ MongoDB connected'))
// // .catch((err) => console.error('❌ MongoDB connection failed:', err));

// // // Routes
// // app.use('/api/auth', authRoutes);
// // app.use('/api/bills', billRoutes); // optional

// // app.get('/', (req, res) => res.json({ message: '🚀 Server running' }));

// // app.listen(PORT, () => {
// //   console.log(`🌐 Server listening on http://localhost:${PORT}`);
// // });
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const authRoutes = require('./routes/authRoutes');
// const billRoutes = require('./routes/billRoutes'); // If you have this
// const dashboardRoutes = require('./routes/dashboardRoutes');
// const { errorHandler } = require('./utils/error'); // Import error handler middleware
// const companyAuthRoutes = require('./routes/companyAuthRoutes');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // 🟦 CORS config for localhost:5173 (Vite frontend)
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));

// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('✅ MongoDB connected'))
// .catch((err) => console.error('❌ MongoDB connection failed:', err));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/bills', billRoutes); // optional
// app.use('/api/user', dashboardRoutes);
// app.use('/api/company', companyAuthRoutes);

// app.get('/', (req, res) => res.json({ message: '🚀 Server running' }));

// // Error handling middleware - should be after all routes
// app.use(errorHandler);

// // Handle 404 routes
// app.use((req, res) => {
//   res.status(404).json({ message: '404 - Route not found' });
// });

// app.listen(PORT, () => {
//   console.log(`🌐 Server listening on http://localhost:${PORT}`);
// });
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import billRoutes from './routes/billRoutes.js'; // If you have this
import dashboardRoutes from './routes/dashboardRoutes.js';
import { errorHandler } from './utils/error.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🟦 CORS config for localhost:5173 (Vite frontend)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection failed:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bills', billRoutes); // optional
app.use('/api/user', dashboardRoutes);


app.get('/', (req, res) => res.json({ message: '🚀 Server running' }));

// Error handling middleware - should be after all routes
app.use(errorHandler);

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ message: '404 - Route not found' });
});

app.listen(PORT, () => {
  console.log(`🌐 Server listening on http://localhost:${PORT}`);
});
