const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{
        type:String,
        trim:true,
    },
    username:{
        type:String,
        trim:true,
    },
    firstName:{
        type:String,
        trim:true,
    },
    lastName:{
        type:String,
        trim:true,
    },password:{
        type:String,
        trim:true,
    },contactNo:{
        type:String,
        maxLength:10
    },
    profilePic:{
        type:String
    },loginType:{
        type:String
    },profileId:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model('users',userSchema)