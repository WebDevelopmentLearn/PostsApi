import nodemailer from "nodemailer";
import "dotenv/config";



const gmailTransporterInstance = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});


async function sendEmail(to, subject, text, html) {
    try {
        const mailOptions = {
            from: process.env.GMAIL_USERNAME,
            to,
            subject,
            text,
            html,
        };

        return gmailTransporterInstance.sendMail(mailOptions);
    } catch (error) {
        console.log("Error in sendEmail", error);
    }
}


export { sendEmail };

export default gmailTransporterInstance;