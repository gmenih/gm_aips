var path = require('path');

var defaults = {
  root: path.normalize(__dirname + '/../'),
  db: 'mongodb://localhost:27017/aips_dev',
  loginRoute: '/login'
}

module.exports = {
  development: defaults
}['development'];
