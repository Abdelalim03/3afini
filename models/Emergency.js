const mongoose = require('mongoose');


const EmergencySchema = mongoose.Schema({
    Dangerous:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"You should enter the dengerous"],
    },
    recording:{ // id of recording
        type:mongoose.Schema.Types.ObjectId,
        ref:'Recording'
    },
    checked:{
        type:Boolean,
        default:false,
    },
    fast:{
        type:Boolean,
        required:[true,"You should enter the type of emergency "],
    },
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
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient',
    }


},{
    timeStamps:true
})







module.exports = mongoose.model('Emergency',EmergencySchema);