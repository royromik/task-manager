const sgMail= require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name)=>{
   sgMail.send({
       to:email,
       from:'royromik@gmail.com',
       subject:'Welcome to the task manager app',
       text:`Hi ${name}, your account is created. Now you can add your tasks in our app`
   })
} 

const sendCancelEmail = (email, name)=>{
    sgMail.send({
        to:email,
        from:'royromik@gmail.com',
        subject:`Sorry to see you go`,
        text:`Good Bye ${name}. Is there anything we could have done to kept you onboard!!`
    })
}
module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}