import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an email.
 * @param {Object} options - { to, subject, text }
 */
export async function sendEmail({ to, subject, text }) {
  const mailOptions = {
    from: `"Daily Boost" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("📤 Email sent:", info.response);
  } catch (err) {
    console.error("❌ Error sending email:", err.message);
  }
}
