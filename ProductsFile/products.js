const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const verifyToken = require('./helper')
const Router = express.Router()


// Products Schema
const productsSchema = new mongoose.Schema({
    name:String,
    price:Number,
    description:String
}) 



// products Model 
const productsModel = new mongoose.model("products",productsSchema)



// Products receive
Router.post("/products_save",async(req,res)=>{

  const products = new productsModel({
    name:req.body.name,
    price:req.body.price,
    description:req.body.description
  })

     // check vaidation 
     if (
        typeof req.body.name !== 'string' ||
        typeof req.body.price !== 'number' ||
        typeof req.body.description !== 'string'
      ) {
        return res.status(400).send('Invalid request');
      }
    
      
      try{
 
        // Products save
        const output = await products.save()
        res.status(200).json({output,msg:"products save"})
             
     

      }catch(error){
         res.status(500).json({msg:"Internal server error"},error)
      }
   
})




// Products send
Router.get("/products",verifyToken,async(req,res)=>{
    const output = await productsModel.find({})
    res.status(200).json(output)
})


module.exports = Router