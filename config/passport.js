var mongoose = require('mongoose');
var User = mongoose.model('User');

var local = require('./passport/local');

module.exports = function(passport, config){
  passport.serializeUser(function(user, done){
    console.log('serializing', user);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    var options = {where:{_id: id}, select: "username name lastname email type program"};
    User.load(options, function(err, user){
      done(err, user);
    })
  });
  passport.use(local);
}
