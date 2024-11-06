const mongoose =require('mongoose');

const connectDb = async () => {
    await mongoose.connect('mongodb+srv://riyazmohammad1603:uiVTGWQSTeoKGQkn@cluster0.fzqyd.mongodb.net/devTinder')
}



module.exports=connectDb
