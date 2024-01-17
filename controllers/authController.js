const Auth = require('../models/auth.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const secretKey = 'd4dbe94cc27521bec9d47547eaed9060d456b071c9ee331e354f6705c2cfaeb5'

const getLoginUsers = async (req, res) => {
    try {
        const userData = await Auth.find({}, {username: 1, email: 1});
        res.status(200).json(userData)
    } catch (error) {
        res.send(500).json({msg: error.message})
       console.log('error in fetching users', error.message); 
    }
}

const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
    
        const user = await Auth.findOne({ email });
        if(user){
            return res.status(200).json({message: 'User already registered', success: false})
        }
        
        const salt = await bcrypt.genSalt(10);
        const hassedPassword = await bcrypt.hash(password, salt);
        const result = await Auth.create({
            username, 
            email,
            password: hassedPassword
        })
    
        return res.status(201).json({
            message: 'User Register successfully',
            success: true,
            result,
        })
    } catch (error) {
        console.log('error in register', error);
        return res.status(403).json({message: error.message})
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Auth.findOne({ email });
        if(!user){
            return res.status(200).json({message: 'User not found', success: false})
        }
        const matchedPassword = await bcrypt.compare(password, user.password);
        if(!matchedPassword){
            return res.status(200).json({message: 'Invalid email or password', success: false});
        }
        const userId = {
           id: user._id
        }
        const token = jwt.sign(userId, secretKey, {
            expiresIn: "1d",
        });
    
        return res.status(200).json({
            message: 'User login successfull',
            success: true,
            token
        })
    } catch (error) {
        console.log('error in login', error);
        return res.status(403).json({message: error.message})
    }
}

// const authController = async(req, res) => {
//     try {
//         const user = await Auth.findOne({id: req.body.userId});
//         if(!user){
//             return res.status(200).json({
//                 message: 'User not found',
//                 success: false
//             })
//         }else{
//             res.status(200).json({
//                 success: true,
//                 data: {
//                     name: user.name,
//                     email: user.email
//                 },
//             });
//         }
//     } catch (error) {
//         console.log('error', error);
//         return res.status(500).json({message: error.message})
//     }
// }


module.exports = {
    getLoginUsers,
    registerController,
    loginController,
    // authController,
}