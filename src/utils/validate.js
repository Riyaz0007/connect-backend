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
module.exports = isValidate;