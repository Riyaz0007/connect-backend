const express = require('express');
const { authUser } = require('../middlewares/auth');
const { ConnectionRequest } = require('../models/ConnnectionRequests');
const linkRouter = express.Router();

const ALLOWED_DATA = ["firstName", "lastName", "gender", "skills"];

linkRouter.get('/connections', authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;

        // Fetch the connection requests where status is 'accept'
        const connections = await ConnectionRequest.find({
            $or:[
                { fromUserId: loggedInUser._id, status: "accept" },
                { toUserId: loggedInUser._id, status: "accept" }
            ]
        })
        .populate("fromUserId", ALLOWED_DATA)
        .populate("toUserId", ALLOWED_DATA); // Populate 'toUserId' as well if needed

        // Check if no connections found
        if (connections.length === 0) {
            return res.status(404).json({
                message: 'No connections found.'
            });
        }

        // Respond with the found connections
        res.json({
            data: connections
        });

    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({
            message: 'Server error. Please try again later.',
            error: err.message
        });
    }
});
linkRouter.get('/requests',authUser,async(req,res)=>{
    try{
        const loggesInUser = req.user;
        const connection= await ConnectionRequest.find({
            toUserId:loggesInUser._id,
            status:"interest"
        })
        if(connection.length===0){
            throw new Error('connection not found')
        }
        res.json({
            data:connection
        })

    }
    catch(err){
        res.json({
            message:err.message
        })
    }


})
module.exports = { linkRouter };
