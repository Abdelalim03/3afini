const mongoose = require('mongoose');
const config = require('./config');
exports.connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useMongoClient: true
    })
    .then(db=>{
      console.log('Successfully Connected to the Database');
    })
  } catch (error) {
    console.log(error.message)
  }
}