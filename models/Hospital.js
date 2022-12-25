const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const hospitalSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"You should enter the name of your hospital"],
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
    /*location:{
        type:Point,
        required:[true,"You should enter your location"],
    },*/
    acceptEmrgencies:{
        type:Boolean,
        default:true,
    },
    email:{
        type:String,
        required:[true,"You should enter your email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"You should enter your password"]
    },
    phone:{
        type:String,
        required:[true,"You should enter your phone"],
        unique:true
    },

},{
    timeStamps:true
})



hospitalSchema.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
      
      this.password = hash;
      next();
    }
  );



module.exports = mongoose.model('Hospital',hospitalSchema);