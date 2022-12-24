const mongoose = require('mongoose');


const doctorSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"You should enter your firstname"],

    },
    lastname:{
        type:String,
        required:[true,"You should enter your lastname"],
    },
    birthdate:{
        type:Date,
        requireed:[true,"You should enter your birthdate"],
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
    specialities:[{
        type:String,
        default:"General Doctor",
        unique:true
    }]

},{
    timeStamps:true
})







module.exports = mongoose.model('Doctor',doctorSchema);