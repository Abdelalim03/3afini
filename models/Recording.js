const mongoose = require('mongoose');
const pointSchema = require('./point');

const recordingSchema = mongoose.Schema({
    location:{
        type:pointSchema,
        enum:["low","medium","high"],
        required:[true,"You should enter the dengerous"],

    },
    photo:{ // id of recording
        type:String,
        required:true
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient',
    }

},{
    timeStamps:true
})







module.exports = mongoose.model('Recording',recordingSchema);