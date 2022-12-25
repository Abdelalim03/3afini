const mongoose = require('mongoose');
exports.connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    .then(db=>{
      console.log('Successfully Connected to the Database');
    })
  } catch (error) {
    console.log(error.message)
  }
}