const mongoose = require('mongoose');


const EmergencySchema = mongoose.Schema({
    Dangerous:{
        type:String,
        enum:["low","midium","high"],
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

},{
    timeStamps:true
})







module.exports = mongoose.model('Emergency',EmergencySchema);