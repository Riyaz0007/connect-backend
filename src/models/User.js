const mongoose = require('mongoose');
const validator = require('validator');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        minLength:5,
        maxLength:20,
    },
    lastName:{
        type: String,
        minLength:3,
        maxLength:20,

    },
    emailId:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Enter the correct email!')
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('The password is not strong!')
            }

        }

    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String
    },
    photoUrl:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbgJDFLehkQpFnas_gqV8aGpJTzR26MIlsatrb458vJWIFM9KZpv0HXnSRsbHJ6VjLx4I&usqp=CAU',
        validate(value){
            if(!validator.isURL(value)){
                throw new Error ('Invalid url enterd')
            }
        }

    },
    skills:{
        type:[String],
    }
},
{ timestamps: true })

userSchema.methods.getjwt=function(user){
    user=this;
    const token = jwt.sign({_id:user._id},"MOHAMMAD@1603$2002");
    return token;

}
userSchema.methods.validatePassword = async function(password){
    const user=this;
    const hashesPassword=user.password;
    return await bcrypt.compare(password,hashesPassword)
}

const User = mongoose.model('User',userSchema)

module.exports= User