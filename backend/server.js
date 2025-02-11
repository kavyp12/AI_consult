const { connectDB, Submission } = require('./api/db');
const { sendNotificationEmail } = require('./api/emailService');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', // Vite default port
    'http://localhost:3000',
    'https://ahttps://ai-consult-iota.vercel.app',
    /\.vercel\.app$/
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      if (!process.env.MONGODB_URI) {
        console.error('MONGODB_URI is not defined');
        return res.status(500).json({ 
          message: 'Server configuration error', 
          error: 'Database connection string is not configured' 
        });
      }

      await connectDB();
      const submission = new Submission(req.body);
      await submission.save();
      await sendNotificationEmail(req.body);
      return res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error processing submission:', error);
      if (error.code === 11000) {
        return res.status(400).json({ message: 'This email has already been submitted' });
      }
      return res.status(500).json({ 
        message: 'Error processing your submission', 
        error: error.message 
      });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};

app.post('/api/contact', handler);

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// For Vercel
module.exports = app;
