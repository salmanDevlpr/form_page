const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel')
require('dotenv').config()
const getUserRoutes = require('./routes/userRoutes')
const createUserRoutes = require('./routes/userRoutes')

const app = express();
app.use(express.json())
const PORT = 8000;



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('db connected')
}

app.use('/get', getUserRoutes)
app.use('/post', createUserRoutes)


// app.post('/post', async (req, res)=> {
//     const {name, email, phone, age} = req.body;

//     if(!(name || email, phone, age)){
//         res.json({message: 'All fields are required...'})
//     }

//     const result = await User.create({
//         name,
//         email,
//         phone,
//         age
//     })

//     console.log(('result', result));

//     res.json({message: 'success'})

//     result.save()

// })



app.listen(PORT, ()=> console.log(`server is running at port ${PORT}`))