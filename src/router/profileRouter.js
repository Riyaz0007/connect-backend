const express = require('express');
const profileRouter = express.Router();
const {authUser} = require('../middlewares/auth');
const {isProfileValidate} = require('../utils/validate');


profileRouter.get('/profile',authUser,async(req,res)=>{
    const user = req.user;
    res.send(user);
})

profileRouter.patch('/profile/edit',authUser,async (req,res)=>{
    try{if(!isProfileValidate){
        throw new Error('update not allowed!')
    }
    const loggedUser=req.user
    Object.keys(req.body).forEach((key)=>{
        loggedUser[key]=req.body[key]
    })
    await loggedUser.save()
    res.json({
        message:'updated successfully!'
    })}
    catch(err){
        res.json({
            ERR:err.message
        })
    }

})



module.exports = profileRouter;