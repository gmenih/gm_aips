var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var jade = require('jade');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var compression = require('compression');
var connectMongo = require('connect-mongo')(session);

var logger = require('morgan');
var flash = require('connect-flash');


module.exports = function(app, config){
  app.use(compression({threshold:512}));
  app.set('jade', jade);
  app.set('views', path.join(config.root, 'app/views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(config.root, 'public')));
  app.use(session({
    secret: 'bigBadW0lph',
    resave: true,
    saveUninitialized: false,
    store: new connectMongo({
      collection: 'sessions',
      url: config.db
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.locals.basedir = path.join(config.root, 'app/views');
}
