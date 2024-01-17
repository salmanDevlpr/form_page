const jwt = require('jsonwebtoken');
const secretKey = 'd4dbe94cc27521bec9d47547eaed9060d456b071c9ee331e354f6705c2cfaeb5'

module.exports = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token,secretKey, (err, decode)=>{
        if(err){
            return res.status(200).json({
                message: 'Auth failed',
                success: false
            })
        }else{
            req.body.userId = decode.id;
            next();
        }
    })
}