const mongoose = require('mongoose');


const notificatoinSchema = mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient',
    },
    status:{
        type:Boolean,
        required:[true,"You should enter your status"],
    }

},{
    timeStamps:true
})







module.exports = mongoose.model('Doctor',doctorSchema);