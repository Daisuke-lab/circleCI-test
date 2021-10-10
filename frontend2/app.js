var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ideacardRouter = require('./routes/ideacard');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ideacard',ideacardRouter)

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


DATABASE_USER = "root"
DATABASE_PASSWORD = "3153Zr0314"
DATABASE_NAME = "kj"
mongoose.connect(`mongodb+srv://root:3153Zr0314@kj.e9gez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


module.exports = app;