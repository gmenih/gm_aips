var express = require('express');
var passport = require('passport');

var app = express();

var port = process.env.PORT || 3000;

require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes.js')(app, passport);

app.listen(port);
console.log('Express app started on port ' + port);

/**
* Expose
*/

module.exports = app;
