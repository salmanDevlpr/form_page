const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        reqired: true
    },
    email: {
        type: String,
        reqired: true
    },
    phone: {
        type: Number,
        reqired: true
    },
    age: {
        type: Number,
        reqired: true
    },
    appointmentDate: {
        type: Date,
        reqired: true
    },
    appointmentTime: {
        type: String,
        reqired: true
    },
    
},{
    timestamps: true
})

const User = mongoose.model('user', userSchema);
module.exports = User;