const mongoose = require('mongoose');

const recordingSchema = mongoose.Schema({
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
    tempurature : {
        type:Number,
    },
    blodpressure :{
        SYSTOLIC : {
            type:Number 
        },
        DIASTOLIC : {
            type:Number , 
        }
    },
    glycemie :{
        type:Number
    },
    heartbeat : {
        type : Number 
    },
    fast :{
        type :Boolean,
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