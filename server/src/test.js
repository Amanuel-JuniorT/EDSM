import nodemailer from "nodemailer";

var transport = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  secure: false,
  auth: {
    user: "api",
    pass: "67bfd8d65b40701c486f89541b2bba99"
  }
});

const mailOptions = {
  from: 'hello@demomailtrap.co',
  to: 'amanueltzb@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

// Send the email
transport.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});