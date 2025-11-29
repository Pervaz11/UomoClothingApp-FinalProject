import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ------------------ VERIFY EMAIL ------------------
const sendVerificationEmail = async (toEmail, userFullName, verificationLink) => {
  try {
    await transporter.sendMail({
      from: `"Bazaar" <${process.env.GMAIL_USER}>`,
      to: toEmail,
      subject: "Verify Your Email Address",
      html: `... your HTML ...`,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

// ------------------ UNLOCK ACCOUNT ------------------
const sendUnlockAccountEmail = async (toEmail, userFullName, unlockAccountLink) => {
  try {
    const lockDate = new Date();
    const unlockDate = new Date(lockDate.getTime() + 10 * 60 * 1000);

    await transporter.sendMail({
      from: `"Bazaar" <${process.env.GMAIL_USER}>`,
      to: toEmail,
      subject: "Account Locked - Unlock Your Bazaar Account",
      html: `... your HTML ...`,
    });
  } catch (error) {
    console.error("Error sending unlock email:", error);
  }
};

// ------------------ FORGOT PASSWORD ------------------
const sendForgotPasswordEmail = async (toEmail, resetPasswordLink) => {
  try {
    await transporter.sendMail({
      from: `"Bazaar" <${process.env.GMAIL_USER}>`,
      to: toEmail,
      subject: "Reset Your Bazaar Password",
      html: `... your HTML ...`,
    });
  } catch (err) {
    console.log("Forgot password mail error:", err);
  }
};

// ---------- EXPORTS ----------
export {
  sendVerificationEmail,
  sendUnlockAccountEmail,
  sendForgotPasswordEmail
};
