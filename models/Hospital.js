const mongoose = require('mongoose');
const pointSchema = require('./point');


const hospitalSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"You should enter the name of your hospital"],
    },
    location:{
        type:pointSchema,
        required:[true,"You should enter your location"],
    },
    acceptEmrgencies:{
        type:Boolean,
        default:true,
    },
    email:{
        type:String,
        required:[true,"You should enter your email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"You should enter your password"]
    },
    phone:{
        type:String,
        required:[true,"You should enter your phone"],
        unique:true
    },

},{
    timeStamps:true
})







module.exports = mongoose.model('Hospital',hospitalSchema);