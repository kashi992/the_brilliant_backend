import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { name, email, contactNumber, idea } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'sohaibanwar5876@gmail.com',
    subject: `New Idea Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nContact Number: ${contactNumber}\n\nIdea:\n${idea}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ status: 'success', message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Failed to send email' });
  }
}
