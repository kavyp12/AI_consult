// // db.js
// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const dbConfig = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// };

// const pool = mysql.createPool(dbConfig);

// const initializeDatabase = async () => {
//   try {
//     // Test the connection
//     await pool.query('SELECT 1');
//     console.log('Database connection successful');
//     return true;
//   } catch (error) {
//     console.error('Database connection error:', error);
//     throw error;
//   }
// };

// module.exports = {
//   pool,
//   initializeDatabase
// };

const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    await mongoose.connect(uri, options);
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Define Schema
const submissionSchema = new mongoose.Schema({
  personName: String,
  personDesignation: String,
  email: { type: String, unique: true },
  contactNumber: String,
  companyName: String,
  companyWebsite: String,
  productName: String,
  productWebsite: String,
  createdAt: { type: Date, default: Date.now }
});

// Ensure model hasn't been compiled
const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);

module.exports = { connectDB, Submission };
