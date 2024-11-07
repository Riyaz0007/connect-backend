const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const connectDb = require('./config/database');
const authRouter = require('./routes/authRouter');
const profileRouter = require('./routes/profileRouter');
const { linkRouter } = require('./routes/connections');
const { connectionsRouter } = require('./routes/requests');


app.use(express.json())
app.use(cookieParser())
app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',connectionsRouter);
app.use('/',linkRouter);


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

