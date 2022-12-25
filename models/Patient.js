const mongoose = require('mongoose');


const patientSchema = mongoose.Schema({
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
        required:[true,"You should enter your password"],
        select:false

    },
    phone:{
        type:String,
        required:[true,"You should enter your phone"],
        unique:true
    },
    address:{
        type:String,
        required:[true,"You should enter your address"],
    },
    confirm :{
        type:Boolean , 
        default:false 
    },
    bloody_group:{
        type:String,
        enum:["AB+","AB-","A+","A-","B+","B-","O+","O-"]
    }

},{
    timeStamps:true
})







module.exports = mongoose.model('Patient',patientSchema);