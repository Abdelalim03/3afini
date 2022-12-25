const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const doctorSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"You should enter your firstname"],

    },
    lastname:{
        type:String,
        required:[true,"You should enter your lastname"],
    },
    birthdate:{
        type:Date,
        requireed:[true,"You should enter your birthdate"],
    },
    email:{
        type:String,
        required:[true,"You should enter your email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"You should enter your password"],
        select:false
    },
    phone:{
        type:String,
        required:[true,"You should enter your phone"],
        unique:true
    },
    specialities:[{
        type:String,
        default:"General Doctor",
    }],
    confirmed:{
        type:Boolean,
        default:false
    }

},{
    timeStamps:true
})


doctorSchema.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
  
      this.password = hash;
      next();
    }
  );

doctorSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }


module.exports = mongoose.model('Doctor',doctorSchema);