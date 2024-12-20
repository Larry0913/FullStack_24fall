var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

// MongoDB connection strings
const mongoBookStore = "mongodb+srv://larry0913:llj20010913@bookstore.mh6hj.mongodb.net/BookStore";
const mongoHackHub = "mongodb+srv://larry0913:llj20010913@bookstore.mh6hj.mongodb.net/hackhub";

// Import routers if necessary
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth')

main().catch((err) => console.log(err));
async function main() {
  // Connect to the first database
  await mongoose.connect(mongoBookStore, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to BookStore database");

  // Create a separate connection for the second database
  mongoose.createConnection(mongoHackHub, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to HackHub database");
}

var app = express();

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from this origin
}));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

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
  res.render('error');
});

module.exports = app;
