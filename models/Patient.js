const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const patientSchema = mongoose.Schema({
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
    address:{
        type:String,
        required:[true,"You should enter your address"],
    }
    ,confirmed:{
        type:Boolean,
        default:false
    },
    bloody_group:{
        type:String,
        enum:["AB+","AB-","A+","A-","B+","B-","O+","O-"]
    }

},{
    timeStamps:true
})



patientSchema.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
      
      this.password = hash;
      next();
    }
  );

//   patientSchema.methods.isValidPassword = async function(password) {
//     const user = this;
//     console.log(password, user.password);

//     const compare = await bcrypt.compare(password, user.password);
  
//     return compare;
//   }


//   patientSchema.method('isValidPassword',async function(password) {
//     const user = this;
//     console.log(password, user.password);
//     const compare = await bcrypt.compare(password, user.password);
  
//     return compare;
//   })

 module.exports= mongoose.model('Patient',patientSchema);

