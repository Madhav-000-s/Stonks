import nodemailer from 'nodemailer'
import { WELCOME_EMAIL_TEMPLATE } from './template'



export const tranporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.NODEMAILER_EMAIL,
        pass:process.env.NODEMAILER_PASSWORD,
    }
})

export const sendWelcomeEmail = async({email,name,intro}:any)=>{
    const htmlTemplate=WELCOME_EMAIL_TEMPLATE.replace('{{name}}',name).replace('{{intro}}',intro);
    
    const mailOptions={
        from:`"stonks" <johnstonks@gmail.com>`,
        to:email,
        subject:'Welcome to stonks',
        html:htmlTemplate,
        text:'thanks for signing up'
    }
    await tranporter.sendMail(mailOptions)

}