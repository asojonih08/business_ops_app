import { EmailTemplate } from "@/components/email-template";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";

//RESEND SEND API KEY
// re_MR3z36zW_CX1iswVrTXkzcoUZTGp5CDL4

export async function POST(req) {
  try {
    const {
      emailService,
      to,
      cc,
      bcc,
      subject,
      message,
      attachments,
      scheduledAt,
    } = await req.json();
    console.log(
      "sendEmail\nto: ",
      to,
      "\ncc: ",
      cc,
      "\nbcc: ",
      bcc,
      "\nsubject: ",
      subject,
      "\nmessage: ",
      message,
      "\nattachments amt: ",
      attachments.length
    );
    if (emailService === "gmail") {
      //Send email with Gmail
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      const mailOption = {
        from: process.env.EMAIL_USER,
        to: to,
        cc: cc,
        bcc: bcc,
        subject: subject,
        html: message,
        attachments: attachments.map((attachment) => {
          return { ...attachment, content: attachment.content.split(",")[1] };
        }),
      };

      await transporter.sendMail(mailOption);

      return NextResponse.json(
        { message: "Email Sent Successfully" },
        { status: 200 }
      );
    }
    if (emailService === "resend") {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to,
        subject: subject,
        react: EmailTemplate({ firstName: "John", message }),
        attachments: attachments.map((attachment) => {
          return { ...attachment, content: attachment.content.split(",")[1] };
        }),
        scheduledAt: scheduledAt,
      });
      if (error) {
        console.error("Resend API Error:", error);
        return Response.json({ error }, { status: 500 });
      }

      return NextResponse.json(
        { message: "Email Sent Successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 }
    );
  }
}
