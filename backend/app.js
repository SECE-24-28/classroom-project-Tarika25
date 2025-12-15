const express = require('express');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Mobile Recharge API Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});