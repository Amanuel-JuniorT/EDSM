import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const mailOptions = {
    from: "EDSM@demomailtrap.co",
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);// Return the info object for further processing if needed

};
