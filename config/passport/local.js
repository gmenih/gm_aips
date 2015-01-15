var mongoose = require('mongoose');
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;


module.exports = new LocalStrategy(function(username, password, done) {
  var query = {
    where: {
      username: username
    },
    select: 'name lastname username email hashed_password salt'
  };
  User.load(query, function(err, user) {
    if(!user)
      done(null, false, {message: 'You suck at life bruh'});
    else
      done(null, user);
  })
})
