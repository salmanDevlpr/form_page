
const User = require('../models/userModel');


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




module.exports = {
    getAllUser,
    getUserById,
}