const nodemailer = require('nodemailer');
const User = require('../models/userModel');


const getAllUser = async (req, res) => {
    const allUserData = await User.find();
    res.send(allUserData)
}


const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.json({message: "User is not exist with this ID."})
    }

    return res.json(user)
}

const createUser = async (req, res) => {
    const {name, email, phone, age} = req.body;
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

    if(!(name || email, phone, age)){
        res.json({message: 'All fields are required...'})
    }

    const result = await User.create({
        name,
        email,
        phone,
        age
    })

    res.json({message: 'success'})

    result.save()
}


module.exports = {
    getAllUser,
    getUserById,
    createUser
}