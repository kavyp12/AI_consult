// // api/contact.ts
// import type { NextApiRequest, NextApiResponse } from 'next/server';
// import mongoose from 'mongoose';
// import nodemailer from 'nodemailer';

// // Enable CORS middleware
// const allowCors = (fn: any) => async (req: NextApiRequest, res: NextApiResponse) => {
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   );

//   if (req.method === 'OPTIONS') {
//     res.status(200).end();
//     return;
//   }

//   return await fn(req, res);
// };

// // MongoDB Connection
// const connectDB = async () => {
//   if (mongoose.connections[0].readyState) return;

//   try {
//     await mongoose.connect(process.env.MONGODB_URI!);
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     throw error;
//   }
// };

// // Schema
// const submissionSchema = new mongoose.Schema({
//   personName: String,
//   personDesignation: String,
//   email: { type: String, unique: true },
//   contactNumber: String,
//   companyName: String,
//   companyWebsite: String,
//   productName: String,
//   productWebsite: String,
//   createdAt: { type: Date, default: Date.now }
// });

// // Ensure model hasn't been compiled
// const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);

// // Create email transporter
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT || '587'),
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS
//   }
// });

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     await connectDB();

//     const submission = new Submission(req.body);
//     await submission.save();

//     // Send email notification
//     const emailContent = `
//       New AI Analysis Request:
//       Person Name: ${req.body.personName}
//       Designation: ${req.body.personDesignation}
//       Email: ${req.body.email}
//       Contact Number: ${req.body.contactNumber}
//       Company Name: ${req.body.companyName}
//       Company Website: ${req.body.companyWebsite || 'Not provided'}
//       Product Name: ${req.body.productName}
//       Product Website: ${req.body.productWebsite || 'Not provided'}
//       Submission Time: ${new Date().toLocaleString()}
//     `;

//     await transporter.sendMail({
//       from: process.env.SMTP_USER,
//       to: process.env.COMPANY_EMAIL,
//       subject: 'New AI Analysis Request',
//       text: emailContent
//     });

//     return res.status(201).json({ message: 'Form submitted successfully' });
//   } catch (error: any) {
//     console.error('API Error:', error);

//     if (error.code === 11000) {
//       return res.status(400).json({ message: 'This email has already been submitted' });
//     }

//     return res.status(500).json({ message: 'An error occurred while processing your request' });
//   }
// }

// export default allowCors(handler);


// backend/api/contact.js
const { connectDB, Submission } = require('../db');
const { sendNotificationEmail } = require('../emailService');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await connectDB();

    const submission = new Submission(req.body);
    await submission.save();

    await sendNotificationEmail(req.body);

    return res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error processing request:', error);

    if (error.code === 11000) {
      return res.status(400).json({ message: 'This email has already been submitted' });
    }

    return res.status(500).json({ message: 'Something went wrong!' });
  }
};