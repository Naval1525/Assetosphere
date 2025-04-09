const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendReminderEmail = (to, subject, text) => {
  return transporter.sendMail({
    from: `"Assetosphere" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  });
};

module.exports = sendReminderEmail;
