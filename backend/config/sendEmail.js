import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.RESEND_API) {
  throw new Error("Missing RESEND_API environment variable");
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "CholoKinbo <onboarding@resend.dev>",
      to: sendTo,
      subject: subject,
      html: html,
    });
    if (error) {
      console.error("Email sending error:", error);
      return;
    }
    return { success: true, data };
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
