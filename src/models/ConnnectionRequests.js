const mongoose = require('mongoose');
const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["interest","ignore"],
            message:"{VALUE} is incorrect status type"
        }
        
    }
},{timestamps:true})
connectionRequestSchema.pre("save",function(){
    const connection=this;
    if(connection.fromUserId.equals(connection.toUserId)){
        throw new Error('cannot send connection request to yourself!')
    }

})

const ConnectionRequest = mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports={ConnectionRequest};