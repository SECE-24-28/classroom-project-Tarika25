require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Mobile Recharge API Server is running!',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      health: '/'
    }
  });
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});