// backend/src/utils/mailService.js
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
    rejectUnauthorized: false
  }
});

// ✅ Verification Email
export const sendVerificationEmail = async (toEmail, userFullName, verificationLink) => {
  try {
    await transporter.sendMail({
      from: `"Bazaar" <${process.env.GMAIL_USER}>`,
      to: toEmail,
      subject: "Verify Your Email Address",
      html: `...`, // HTML content
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// ✅ Forgot Password Email
export const sendForgotPasswordEmail = async (toEmail, resetPasswordLink) => {
  try {
    await transporter.sendMail({
      from: `"Bazaar" <${process.env.GMAIL_USER}>`,
      to: toEmail,
      subject: "Reset Your Bazaar Account Password",
      html: `...`, // HTML content
    });
  } catch (error) {
    console.error("Error sending forgot password email:", error);
  }
};

// ✅ Unlock Account Email
export const sendUnlockAccountEmail = async (toEmail, userFullName, unlockAccountLink) => {
  try {
    await transporter.sendMail({
      from: `"Bazaar" <${process.env.GMAIL_USER}>`,
      to: toEmail,
      subject: "Account Locked - Unlock Your Bazaar Account",
      html: `...`, // HTML content
    });
  } catch (error) {
    console.error("Error sending unlock email:", error);
  }
};
