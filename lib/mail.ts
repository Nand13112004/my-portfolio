import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendContactEmail = async (name: string, email: string, subject: string, message: string) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: "nand13112004@gmail.com",
    subject: `Portfolio Contact: ${subject}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
        <h2 style="color: #4f46e5; border-bottom: 1px solid #ddd; padding-bottom: 10px;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #4f46e5;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        <hr style="margin-top: 20px; border: 0; border-top: 1px solid #eee;" />
        <p style="font-size: 0.8em; color: #777;">This email was sent from your portfolio contact form.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Contact email sent successfully.");
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw error;
  }
};
