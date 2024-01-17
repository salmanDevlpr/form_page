const User = require('../models/checkAppointmentModel');

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

    // const allUserData = await User.find();
    // res.send(allUserData)
}


const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.json({message: "User is not exist with this ID."})
    }

    return res.json(user)
}

const createAppointment = async (req, res) => {
    const {name, email, phone, age, appointmentDate, appointmentTime} = req.body;

    const user = await User.findOne({email})

    if(user){
        return res.status(200).json({
            message: "User are already exists",
            success: false,
        })
    }

    if(!(name || email || phone || age || appointmentDate || appointmentTime)){
        res.json({message: 'All fields are required..'})
    }

    const result = await User.create({
        name, 
        email,
        phone,
        age,
        appointmentDate,
        appointmentTime,
    })

    res.json({message: 'success'})

    result.save()
}




module.exports = {
    getAllUser,
    getUserById,
    createAppointment,
}