var db = require('monk')('localhost:27017/aips_dev');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

module.exports = new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    var users = db.get('users');
    users.findOne({
      username: username
    }).
    on('success', function(user) {
      if (!user)
        done(null, false);
      else {
        if (!bcrypt.compareSync(password, user.password))
          done(null, false, {
            message: 'Napačno uporabniško ime ali geslo!'
          });
        else
          done(null, user);
      }
    }).
    on('error', function() {
      done(null, false, {
        message: 'Neznana napaka!'
      });
    })
  });
})
