const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const SendMail = require('../models/sendMailModel');


const getAllUser = async (req, res) => {
    try {
        const appdate = req.params.appointmetDate;
        const rawDate = new Date(appdate);
        const appointmentDate = rawDate.toISOString();
        const allUserData = await User.find({ appointmentDate }, 'appointmentTime');
        res.send(allUserData)
    } catch (error) {
     console.log('errror', error);
     res.status(500).json({message: error.message})   
    }
}


const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.json({message: "User is not exist with this ID."})
    }

    return res.json(user)
}

const createUser = async (req, res) => {
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

    // if(!(name || email || phone)){
    //     res.json({message: 'All fields are required..'})
    // }

    const result = await SendMail.create({
        name,
        email,
        phone,
    })

    res.json({message: 'success'})

    result.save()
}


module.exports = {
    getAllUser,
    getUserById,
    createUser
}