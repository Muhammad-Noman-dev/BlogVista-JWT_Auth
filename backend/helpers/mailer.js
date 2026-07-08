const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

const sendMail = async (email, subject, content) => {
    const mailOption = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: subject,
        html: content
    };

    // Awaited so the serverless function doesn't terminate before the email is sent
    const info = await transporter.sendMail(mailOption);
    console.log("Mail Sent", info.messageId);
    return info;
};

module.exports = {
    sendMail,
};