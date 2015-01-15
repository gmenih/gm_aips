var express = require('express');
var passport = require('passport');
var fs = require('fs');
var mongoose = require('mongoose');

var config = require('./config/config');


var app = express()

var port = process.env.PORT || 3000;

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};
connect();

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});
//bootstrap express config
require('./config/express')(app, config);
//bootstreap passport config
require('./config/passport')(passport, config);
//bootstrap routes
require('./config/routes')(app, passport);

app.listen(port);
console.log('Server started on port ' + port);

module.exports = app;
