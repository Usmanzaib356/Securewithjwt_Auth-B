const express =  require('express')
const mongoose =  require('mongoose')
const cors =  require('cors')
const app = express()
require('dotenv').config()

// middle wears
app.use(cors())
app.use(express.json())


// DB connetion
mongoose.connect(process.env.connection_string)

const db = mongoose.connection

db.on('error',(error)=>{
    console.log(error);
})

db.once('connected',()=>{
    console.log('db connected');
})



// Authentication 
const auth = require('./Authentication/Auth')
app.use(auth)





// server started
app.listen(3000,()=>{
    console.log("server has been started on port 3000");
})




