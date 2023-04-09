const express =  require('express')
const mongoose =  require('mongoose')
const Router = express.Router()
const jwt =  require('jsonwebtoken')
require('dotenv').config()
const secret_key = process.env.Secret



// schema
 const userSchema = new mongoose.Schema({
    name:String,
    password:String
 })



// Model
const userModel =  mongoose.model('user',userSchema)


 // Signup routes
Router.post('/signup',async(req,res)=>{
    
   const user = new userModel({
     name:req.body.name,
     password:req.body.password
   })

   // if check validation
   if(typeof req.body.name !== 'string'  || typeof req.body.password !== 'string' ){
      return res.status(409).send('Invalid request')
   }

   try{
      
      const userExist = await userModel.findOne({name:req.body.name})

       // if check user Exist
      if(userExist ){
        return res.status(400).send('User Already Exist')
      } 
     
      // user saved
      const output = await  user.save()

      // token generate 
     const token = await jwt.sign({user},secret_key)
      res.status(200).json({msg:"Signup Successfully",token})          

   }catch(error){
      res.status(500).json({msg:'Internal Server Error'},error)
   }

})



// Signin Route
Router.post('/signin',async (req,res)=>{

    // if check validation
    if(!req.body.name || !req.body.password ){
      return res.status(409).send('Invalid request')
    }

    try{
  
       const userExist =  await userModel.findOne({name:req.body.name})
       
       // if check user exist 
       if(!userExist){
         return res.status(400).send("User not Found")
       }

       // if check user password
       if(userExist.password !== req.body.password){
         return res.status(403).send("Password incorrect")
       }

      // token generate 
      const token = await jwt.sign({userModel},secret_key)
      res.status(200).json({msg:"Login Successfully ",token}) 

    }catch(error){
      res.status(500).json({msg:'Internal Server Error'},error)
    }  
})
  
  
module.exports = Router

