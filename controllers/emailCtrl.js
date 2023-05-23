const nodemailer=require("nodemailer");
const asynchandler=require("express-async-handler");

const sendEmail=asynchandler(async(data,req,res)=>{
    let transporter=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:process.env.MAIL_ID,
            pass:process.env.MAIL_PASS
        }
    });
    let info =await transporter.sendMail({
        from:"Devlopers corner",
        to:data.to,
        subject:data.subject,
        text:data.text,
        html:data.html
    });
      //console.log("message send ",info.messageId);
      //console.log("Preview Url ",nodemailer.getTestMessageUrl(info));
})

module.exports=sendEmail;