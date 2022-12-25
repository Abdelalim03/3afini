const mongoose = require('mongoose');


const ProtectionCivilSchema = mongoose.Schema({
   
    location: {
        type: {
          type: String, 
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
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