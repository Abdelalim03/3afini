const mongoose = require('mongoose');
const config = require('./config');
exports.connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
       useNewUrlParser: true, useUnifiedTopology: true 
    })
    .then(db=>{
      console.log('Successfully Connected to the Database');
      app.listen(process.env.PORT || 5000)
    })
  } catch (error) {
    console.log(error.message)
  }
}