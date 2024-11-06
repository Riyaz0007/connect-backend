const validator = require('validator');

const isValidate = (req)=>{
    const{firstName,lastName,emailId,password}=req.body;
    if(!firstName){
        throw new Error ('The firstName is not valid')
    }
    else if (!lastName){
        throw new Error ('The lastName is not valid')
    }
    else if(!(validator.isEmail(emailId))){
        throw new Error('Inavlid Email..!')
    }

}

const isProfileValidate = (req)=>{
    const ALLOWED=["firstName","skills","lastName","gender","photoUrl"]
    const isAllowed= Object.keys(req.body).every((item)=>{
        ALLOWED.includes(item)
    })
    return isAllowed;

}
module.exports = {isValidate,isProfileValidate};