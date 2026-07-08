const mongoose = require("mongoose")
const { type } = require("node:os")


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    is_verified:{
        type:Number,
        default:0 //if verified then 1
    },
    image:{
        type:String,
        required:false
    }
})


module.exports = mongoose.model("user" , userSchema);