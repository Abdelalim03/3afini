const mongoose = require('mongoose');


const MessagesSchema = mongoose.Schema({
   
    room:{
        type:String,
        required:[true,"You should enter room"],
        unique:true
    },
    messages:{
        type:[{
            message: String,
            userId: Number
        }],
    },
},{
    timeStamps:true
})







module.exports = mongoose.model('Messages',MessagesSchema);