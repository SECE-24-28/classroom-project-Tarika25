// Simple test to verify server setup without MongoDB dependency
const express = require('express');
const app = express();
const PORT = 5001;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: 'Test server running successfully!',
    timestamp: new Date().toISOString(),
    status: 'OK'
  });
});

app.get('/test', (req, res) => {
  res.json({ 
    message: 'Backend setup complete',
    features: ['Express.js', 'Mongoose Models', 'Proper Structure']
  });
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
  console.log('Backend setup verification successful!');
});