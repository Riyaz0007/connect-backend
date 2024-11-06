const express = require('express');
const app = express();
const bcrypt =require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt =require('jsonwebtoken');
const {authUser} = require('./middlewares/auth');
const connectDb = require('./config/database');
const User = require('./models/User');
const isValidate = require('./utils/validate');


app.use(express.json())
app.use(cookieParser())
const SECRETE_KEY = "MOHAMMAD@1603$2002";
app.post('/signup',async (req,res)=>{
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

app.post('/login',async(req,res)=>{

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

app.get('/profile',authUser,async(req,res)=>{
        const user = req.user;
        res.send(user);
})



app.use('/',(err,req,res,next)=>{
    res.status(400).send('Something went wrong');
})
connectDb().then(()=>{
    console.log('the conection to the db established successfully!')
    app.listen(7777,()=>{
        console.log('The server started listening at port 7777')
    });
})
.catch((err)=>{
    console.log('the connection was unsuccesful..!')
})

