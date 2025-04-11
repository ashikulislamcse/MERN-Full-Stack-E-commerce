import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

async function sendMail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to,
      subject,
      html,
    });
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export default sendMail;
