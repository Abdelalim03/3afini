var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var patientRouter = require('./routes/patient')
var doctorRouter = require('./routes/doctor')
var emergencyRouter = require('./routes/emergency')
let protectionRouter=require('./routes/protectionCivil')
let recordingRouter =require('./routes/recording')

let Hospital = require('./models/Hospital')
let ProtectionCivil=require('./models/ProtectionCivil')

var app = express();
const mongoose = require('mongoose');
 


const dbURI = 'mongodb+srv://TechBlog:sifou123456789@cluster0.h1vs7.mongodb.net/3afini' ;
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected')
        app.listen(process.env.PORT || 5000)

    })
    .catch(err => console.log(err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/patient',patientRouter)
app.use('/doctor',doctorRouter)
app.use('/emergency',emergencyRouter)
app.use('/protection',protectionRouter)
app.use('/recording',recordingRouter)

app.post('/s', (req,res)=>{
   try{
    const hos = new  Hospital({
      name:"sifou",
      location:{
        "type" : "Point",
        "coordinates" : [
          -122.5,
          37.7
        ]
      },
      acceptEmrgencies:true,
      email:"sifou@gmail.com",
      password:"123456789",
      phone:"0555555555"
      })
      hos.save()
      res.json(hos)
   } catch(err)
   {
     res.json("error ")
   }
})


app.post('/a',(req,res)=>{
  try{
    const pro = new ProtectionCivil({
      location:{
        "type" : "Point",
        "coordinates" : [
          -200,
          65
        ]
      },
    email:"ks1@esi.dz",
    phone:"0554789634",
    })
    pro.save() ; 
    res.status(200).json(pro)
  }
  catch(err)
  {
    res.status(400).json("error in ")
  }

})










// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
