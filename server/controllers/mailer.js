import nodemailer from 'nodemailer';
import Mailgen from "mailgen"
import ENV from '../config.js'


// hhtp://ethereal.email/create
let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: ENV.EMAIL,
      pass: ENV.PASSWORD,
    },
  }

let transporter= nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link : "https://mailgen.js/"
    }
})


export const registerMail = async (req,res)=>{
    const {username,userEmail,text,subject} = req.body;

    // body of the email

    var email = {
        body :{
            name: username,
            intro: text || 'Welcome to daily TUtion! we\'re very excited to have you on boward.',
            outro: 'Need help,or have question? Just reply to this email,we\'d love to help.'
        }
    }

    var emailBody = MailGenerator.generate(email);
    let message = {
        from: ENV.EMAIL,
        to: userEmail,
        subject: subject || "Signup Successfull",
        html: emailBody
    }

    //send mail
    transporter.sendMail(message)
    .then(()=>{
        return res.status(200).send({msg: "You should receive an email from us."})
    })
    .catch(error=>{
        res.status(500).send({error})
    })
}