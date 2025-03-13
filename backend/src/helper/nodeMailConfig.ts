import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface MailOptions {
    email: string;
    subject: string;
    html: string;
    attachments?: nodemailer.SendMailOptions["attachments"]; // ✅ Corrected type
}

export const sendMail = async ({ email, subject, html, attachments }: MailOptions): Promise<void> => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER as string,
                pass: process.env.MAIL_PASS as string,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject,
            html,
            attachments, // ✅ Corrected type
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error(`Email sending failed: ${error}`);
    }
};
