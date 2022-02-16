require('dotenv').config();

const nodemailer = require("nodemailer");
class MailService {

    // async..await is not allowed in global scope, must use a wrapper
    async send(msgBody) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        console.log('enviando e-mail');
        const message = {
            from: `"${process.env.APP_NAME}" <${process.env.APP_MAIL}>`, // sender address
            to: msgBody.to, // list of receivers
            subject: msgBody.subject,//"Hello ✔", // Subject line
            text: msgBody.text,//"Hello world?", // plain text body
            html: `${msgBody.html}`//"<b>Hello world?</b>", // html body
        }
        console.log(message);

        let testAccount = await nodemailer.createTestAccount();
        
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: `${process.env.APP_MAIL_HOST}`, //"smtp.gmail.com",
            port: `${process.env.APP_MAIL_PORT}`,//465,
            secure: `${process.env.APP_MAIL_SECURE}`,//true, // true for 465, false for other ports
            auth: {
                user: `${process.env.APP_MAIL}`, // generated ethereal user
                pass: `${process.env.APP_MAIL_PSW}`, // generated ethereal password
            },
        });
        
        // send mail with defined transport object
        let info = await transporter.sendMail(message);

        console.log('Email enviado!');

    }
}
module.exports = MailService