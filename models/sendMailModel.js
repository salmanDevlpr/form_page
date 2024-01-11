const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
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
    
},{
    timestamps: true
})

const SendMail = mongoose.model('mail', mailSchema);
module.exports = SendMail;