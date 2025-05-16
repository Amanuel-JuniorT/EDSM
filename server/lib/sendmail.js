import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "ccf3d9f5b7568cf71df3352935b1e4c9",
    },
  });

  const mailOptions = {
    from: "smtp@mailtrap.io",
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions); // Return the info object for further processing if needed

};
