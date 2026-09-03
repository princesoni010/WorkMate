require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/db');

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const workerRoutes = require('./src/routes/workerRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const ratingRoutes = require('./src/routes/ratingRoutes');
const grievanceRoutes = require('./src/routes/grievanceRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

const { notFound, errorHandler } = require('./src/middleware/errorMiddleware');

const app = express();

app.use(cors({ 
  origin: '*',
  credentials: true 
}));
app.use(express.json());

// Root & Health check endpoints
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    name: 'WorkMate Cooperative Gig Platform API',
    version: '1.0.0',
    status: 'ONLINE',
    docs: 'Smart India Hackathon #26089'
  });
});

app.get('/api', (req, res) => {
  res.json({ 
    success: true, 
    message: 'WorkMate API Root',
    endpoints: [
      '/api/auth',
      '/api/workers',
      '/api/bookings',
      '/api/payments',
      '/api/ratings',
      '/api/grievances',
      '/api/admin',
      '/api/health'
    ]
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    status: 'HEALTHY',
    message: 'WorkMate API is running smoothly', 
    timestamp: new Date().toISOString() 
  });
});

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/grievances', grievanceRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 WorkMate API running on http://localhost:${PORT}`);
  });
});
