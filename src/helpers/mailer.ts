import nodemailer from "nodemailer";
import userModel from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashtoken = await bcrypt.hash(userId.toString(), 10); // ✅ await it

    if (emailType === "VERIFY") {
      await userModel.findByIdAndUpdate(userId, {
        verifyToken: hashtoken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await userModel.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashtoken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4267f42a97b489",
        pass: "c4c1184a75b9c4",
      },
    });

    const domain = process.env.DOMAIN || "http://localhost:3000";

   const mailOption = {
  from: "ismailarshad1947@gmail.com",
  to: email,
  subject:
    emailType === "VERIFY" ? "Verify your email" : "Reset your password",
  html: `<p>Click <a href="${domain}${
    emailType === "VERIFY"
      ? `/verifyemail?token=${hashtoken}`
      : `/resetpassword?token=${hashtoken}`
  }">here</a> to ${
    emailType === "VERIFY" ? "verify your email" : "reset your password"
  } or copy and paste the link below in your browser: <br> ${domain}${
    emailType === "VERIFY"
      ? `/verifyemail?token=${hashtoken}`
      : `/resetpassword?token=${hashtoken}`
  }</p>`,
};

    const mailresponse = await transport.sendMail(mailOption);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};