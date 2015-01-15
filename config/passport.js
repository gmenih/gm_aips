var db = require('monk')('localhost:27017/aips_dev');
var LocalStrategy = require('passport-local').Strategy;
var local = require('./passport/local');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    console.log('serializing user');
    done(null, user._id);
  });

  passport.deserializeUser(function(userId, done) {
    console.log('deserializing user');
    db.get('users').findById(userId, function(err, user) {
      done(err, user);
    });
  });

  passport.use(local);
}
