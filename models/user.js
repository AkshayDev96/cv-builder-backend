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
    },address:{
        type:String,
    },careerObjective:{
        type:String,
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
    },
    defaultLayout:{
        type:String,
        enum:["layout1","layout2"],
        default:"layout1"
    },
    educationDetails:{
        type:Array
    },
    workDetails:{
        type:Array
    },projectDetails:{
        type:Array
    },skillsDetails:{
        type:Array
    },
    socialMedia:{
        type:Object
    }
},{timestamps:true})

module.exports = mongoose.model('users',userSchema)