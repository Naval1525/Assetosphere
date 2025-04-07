const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection failed:', err));

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.json({ message: '🚀 Server running' }));

app.listen(PORT, () => {
  console.log(`🌐 Server listening on http://localhost:${PORT}`);
});
