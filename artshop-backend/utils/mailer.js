import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: `"Textures by Shifa" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}`);
    console.log("📤 Email to:", to);
    console.log("📬 Subject:", subject);
    console.log("📄 HTML:", htmlContent);

  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};

export default sendEmail;
