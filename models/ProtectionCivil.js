const mongoose = require('mongoose');
const pointSchema = require('./point');


const ProtectionCivilSchema = mongoose.Schema({
   
    location:{
        type:pointSchema,
        required:[true,"You should enter your location"],
    },
    email:{
        type:String,
        required:[true,"You should enter your email"],
        unique:true
    },
    phone:{
        type:String,
        required:[true,"You should enter your phone"],
        unique:true
    },

},{
    timeStamps:true
})







module.exports = mongoose.model('ProtectionCivil',ProtectionCivilSchema);