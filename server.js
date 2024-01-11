const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel')
require('dotenv').config()
const cors = require('cors')
const UserRoute = require('./routes/userRoutes')

const app = express();
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT;



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('db connected')
}

app.get('/health', (req, res)=> {
    res.json({message: 'This is home page'})
})

app.use('/', UserRoute)






app.listen(PORT, ()=> console.log(`server is running at port ${PORT}`))