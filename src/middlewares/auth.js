const User = require('../models/User');
const jwt = require('jsonwebtoken');

const SECRETE_KEY = "MOHAMMAD@1603$2002";
const authUser= async (req,res,next)=>{
    try{
        const cookies = req.cookies;
        const {token} = cookies;
        if(!token){
            throw new Error("Invalid token");
        }
        const decoded= jwt.verify(token,SECRETE_KEY);
        const{_id}=decoded;
        const user = await User.findById(_id);
        if(!user){
            throw new Error('User not found!')
        }
        req.user=user;
        next();
    }
    catch(err){
        res.send('ERROR : '+ err.message)
    }
}
module.exports={
    authUser
}