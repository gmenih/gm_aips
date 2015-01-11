var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var monk = require('monk');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');
// connect to database
var db = monk('localhost:27017/aips_dev')

var indexRouter = require('./routes/index');
var studentRouter = require('./routes/student');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// passport session
app.use(session({secret: 'bigbadw0lph', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// add DB to request
app.use(function(req, res) {
  req.db = db;
  req.next();
});

app.use('/', indexRouter);

/** USER AUTH **/



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Phau Ov Phau');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
