const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const User =require('../models/User');
const isValidate = require('../utils/validate');


authRouter.post('/login',async(req,res)=>{
    try{
        const{emailId,password} = req.body;
        const user = await User.findOne({emailId:emailId})
        if(!user){
            throw new Error ("Invalid credentials!" )
        }
        const isPassword= user.validatePassword(password);
        if(!isPassword){
            throw new Error('Invalid credentials!');
        }
        //generate the jwt token
        const token = user.getjwt();
        res.cookie("token",token).send('logged in successful!')
    }
        catch(err){
            res.send('ERROR : '+err.message)
    }
    

})

authRouter.post('/signup',async (req,res)=>{
    try{
       const{firstName,lastName,emailId,password} = req.body;
       //validatong the data send by the client
       isValidate(req);
       //hashing the password

       const hashedPassword = await bcrypt.hash(password,10)


       const user = new User({
        firstName,
        lastName,
        emailId,
        password:hashedPassword
       });
       await user.save()
       res.send('the data added successfully!');
    }
    catch(err){
        res.send("ERROR : "+ err.message)
    }
})

authRouter.post('/logout',(req,res)=>{
    
    res.cookie('token', null , {expires:new Date(Date.now())})
    res.json({
        message:`logout sucessfully!`,
    })

})











module.exports=authRouter;