const nodeMailer =require("nodemailer")
require("dotenv").config()
exports.sendEmail=(reciever,subject,text)=>{
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    let mailOptions = {
        from: process.env.EMAIL_USERNAME, // sender address
        to: reciever, // list of receivers
        subject:subject, // Subject line
        text: text, // plain text body
        html: `<b>${text}</b>` // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('index');
        });
    }