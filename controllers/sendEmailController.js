const nodemailer = require('nodemailer');
const SendMail = require('../models/sendMailModel');


const sendMailToUser = async (req, res) => {
    const {name, email, phone} = req.body;
    const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "salman.khan@ayurcentral.in",
            pass: "hujvlghlqirdyfre"
        }
    });

    let details = {
        from: "salman.khan@ayurcentral.in",
        to: email,
        subject: "testing our nodemailer",
        text: "testing out second sender"
    }

    mailTransporter.sendMail(details, (err, info)=> {
        if(err){
            console.log('error generated in nodemailer');
        }else {
            console.log('mail sent successfully', info.response);
        }
    })

    if(!(name || email || phone)){
        res.json({message: 'All fields are required..'})
    }

    const result = await SendMail.create({
        name,
        email,
        phone,
    })

    res.json({message: 'success'})

    result.save()
}

module.exports = {
    sendMailToUser
}