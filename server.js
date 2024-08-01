const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
     user: 'sisindrareddy143@gmail.com',
      pass: 'zmrgjkvomgybyaal'
  }
});

app.post('/api/contact', (req, res) => {
  const { from_email, from_name, subject, message } = req.body;

  const mailOptions = {
    from: from_email,
    to: 'vallukururaj@gmail.com',
    subject: `New contact form submission: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); background-color: #3FA2F6;height:50vh;">
        <h2 style="background-color: #4A249D; color: white; padding: 10px; border-radius: 10px 10px 0 0; text-align: center;">New Contact Form Submission</h2>
        <div style="padding: 20px;">
          <p><strong>Name:</strong><strong style="color:white"> ${from_name}</strong></p>
          <p><strong>Email:</strong><strong style="color:white"> ${from_email}</strong></p>
          <p><strong>Subject:</strong><strong style="color:white"> ${subject}</strong></p>
          <p><strong>Message:</strong></p>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;"><strong>${message}</strong></p>
        </div>
        
         <h3 style="text-align: center; background: #8E3E63;max-width: 300px;margin: auto;color: #fff;" >Thank you for reaching out!</h3>
      
      </div>
      `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send('Message sent successfully');
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
