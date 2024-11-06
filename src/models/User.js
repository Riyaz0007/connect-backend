const mongoose = require('mongoose');
const validator = require('validator')
const userScema = new mongoose.Schema({
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

const User = mongoose.model('User',userScema)

module.exports= User