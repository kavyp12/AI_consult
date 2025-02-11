// // emailService.js
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS
//   }
// });

// async function sendNotificationEmail(formData) {
//   const emailContent = `
//     New AI Analysis Request:
    
//     Person Name: ${formData.personName}
//     Designation: ${formData.personDesignation}
//     Email: ${formData.email}
//     Contact Number: ${formData.contactNumber}
//     Company Name: ${formData.companyName}
//     Company Website: ${formData.companyWebsite || 'Not provided'}
//     Product Name: ${formData.productName}
//     Product Website: ${formData.productWebsite || 'Not provided'}
//     Status: Pending
    
//     Submission Time: ${new Date().toLocaleString()}
//   `;

//   const mailOptions = {
//     from: process.env.SMTP_USER,
//     to: process.env.COMPANY_EMAIL,
//     subject: 'New AI Analysis Request',
//     text: emailContent
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Notification email sent successfully');
//   } catch (error) {
//     console.error('Email sending error:', error);
//     throw error;
//   }
// }

// module.exports = { sendNotificationEmail };


// emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendNotificationEmail = async (formData) => {
  const emailContent = `
    New AI Analysis Request:
    Person Name: ${formData.personName}
    Designation: ${formData.personDesignation}
    Email: ${formData.email}
    Contact Number: ${formData.contactNumber}
    Company Name: ${formData.companyName}
    Company Website: ${formData.companyWebsite || 'Not provided'}
    Product Name: ${formData.productName}
    Product Website: ${formData.productWebsite || 'Not provided'}
    Submission Time: ${new Date().toLocaleString()}
  `;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.COMPANY_EMAIL,
    subject: 'New AI Analysis Request',
    text: emailContent
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendNotificationEmail };