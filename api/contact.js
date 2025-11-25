// api/contact.js
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).send('Method not allowed');
  }

  // Parse JSON body (Vercel may auto-parse, but this ensures compatibility)
  let body = req.body;
  if (typeof req.body === 'string') {
    try {
      body = JSON.parse(req.body);
    } catch (e) {
      return res.status(400).send('Invalid JSON');
    }
  }

  const { name, email, message } = body || {};

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).send('Missing fields');
  }

  // Read settings from Vercel environment variables
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    TO_EMAIL,
    FROM_EMAIL,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !TO_EMAIL) {
    console.error('Missing SMTP environment variables');
    return res.status(500).send('Email not configured');
  }

  // Create the email transporter (using iCloud SMTP)
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: false, // false for port 587 (STARTTLS)
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: FROM_EMAIL || SMTP_USER,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New message from ${name} via toolfoliohub`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    // Simple success response (you could return a nicer HTML if you want)
    return res.status(200).send('OK');
  } catch (err) {
    console.error('Error sending email:', err);
    return res.status(500).send('Failed to send email');
  }
};

