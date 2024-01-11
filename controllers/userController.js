const nodemailer = require('nodemailer');
const User = require('../models/userModel');


const getAllUser = async (req, res) => {
    try {
        const appdate = req.params.appointmetDate;
        console.log('appdate', appdate);
        const rawDate = new Date(appdate);
        const appointmentDate = rawDate.toISOString();
        console.log('appointmentDate', appointmentDate);
        const allUserData = await User.find({ appointmentDate }, 'appointmentTime');
        // const allUserData = await User.find();
        console.log('alluser', allUserData);
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
    const {name, email, phone, age, appointmentDate, appointmentTime} = req.body;
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
    console.log('email', email);

    mailTransporter.sendMail(details, (err, info)=> {
        if(err){
            console.log('error generated in nodemailer');
        }else {
            console.log('mail sent successfully', info.response);
        }
    })

    if(!(name || email, phone, age, appointmentDate, appointmentTime)){
        res.json({message: 'All fields are required..'})
    }

    const result = await User.create({
        name,
        email,
        phone,
        age,
        appointmentDate,
        appointmentTime
    })

    res.json({message: 'success'})

    result.save()
}


module.exports = {
    getAllUser,
    getUserById,
    createUser
}