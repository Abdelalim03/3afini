const mongoose = require('mongoose');
const pointSchema = require('./point');

const recordingSchema = mongoose.Schema({
    dangerous:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"You should enter the dengerous"],

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