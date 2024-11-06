const express = require('express');
const app = express()
const {authUser,authAdmin} = require('./middlewares/auth')
const connectDb = require('./config/database')
const User = require('./models/User');



app.use(express.json())

app.post('/signup',async (req,res)=>{
    try{
       const data = req.body;
       const skills = req.body.skills;
       if(skills?.length>10){
        throw new Error('Max 10 skills are allowed');
       }
       const user = new User(data);
       await user.save()
       res.send('the data added successfully!');
    }
    catch(err){
        res.send("The data was not added"+ err.message)
    }
})

app.get('/user',async (req,res)=>{
    const userEmail = req.body.emailId
    const users = await User.find({emailId:userEmail})
    if(users.length ===0){
        res.send('user not found')
    }
    else{
        res.send(users)
    }

})

app.patch('/user', async(req,res)=>{
    const userId= req.body.userId;
    try{
        const Allowed=["firstName","gender","age","skills","photoURl","userId"]
        const isAllowed = Object.keys(req.body).every((i)=>Allowed.includes(i))
        if(!isAllowed){
            throw new Error('Update  not Allowed ');

        }
        await User.findByIdAndUpdate({_id:userId},req.body);
        res.send('The data updated successfully!')
    }
    catch(err){
        res.status(500).send('Something went wrong '+ err.message);
    }


})

app.delete('/user', async(req,res)=>{
    try{
        const userId =req.body.userId;
        await User.findByIdAndDelete({_id:userId})
        res.send('The data deleted sucessfully! ');
    }
    catch(err){
        res.send('the data was not deleted '+err.message)
    }
    

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

