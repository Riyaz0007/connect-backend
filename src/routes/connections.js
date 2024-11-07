const express =require('express');
const { authUser } = require('../middlewares/auth');
const { ConnectionRequest } = require('../models/ConnnectionRequests');
const User = require('../models/User');
const connectionsRouter = express.Router();

connectionsRouter.post("/request/:status/:toUserId",authUser,async(req,res)=>{
    try{
        const fromUserId=req.user._id;
        const{toUserId,status}=req.params;
        if(!(["ignore","interest"].includes(status))){
            throw new Error(` Invalid status!`);
        }
        const existingConnection = await ConnectionRequest.findOne({
            $or:[{fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}],
        })
        if(existingConnection){
            throw new Error('The connection already sent!')
        }
        const existingUser= await User.findOne({_id:toUserId});

        if(!existingUser){
            throw new Error('the user does not exists!');
        }
        const connection = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data = await connection.save();
        res.json({
            message:"connection sent successfully!",
            data:data
        })}
    catch(err){
        res.json({
            message:"ERROR : "+ err.message
        })
    }
})




module.exports={connectionsRouter}