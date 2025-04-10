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
      from: "CholoKinbo <onashik@gmail.com>",
      to: sendTo,
      subject: subject,
      html: html,
    });
    if (error) {
      Hello;
      return console.error({ error });
    }
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;