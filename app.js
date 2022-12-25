var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { connectDb } = require('./config/db');
require('dotenv').config({ path: '.env' });

var app = express();
connectDb();
console.log(process.env.MONGO_URI);
const patientRouter = require('./routes/patient')
const doctorRouter = require('./routes/doctor')
const emergencyRouter = require('./routes/emergency')
let protectionRouter=require('./routes/protectionCivil')
const hospitalRouter = require('./routes/Hospital')

const recordingRouter = require('./routes/recordingRouter');





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
app.use('/hospital',hospitalRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  res.status(err.status || 500);
  res.json({'error':err});
});

module.exports = app;
