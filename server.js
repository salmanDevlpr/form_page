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

app.get('/', (req, res)=> {
    res.json({message: 'This is home page'})
})

app.use('/get', getUserRoutes)
app.use('/post', createUserRoutes)






app.listen(PORT, ()=> console.log(`server is running at port ${PORT}`))