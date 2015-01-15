var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.load = function (req, res, next, id) {
  var options = {
    where: { _id : id }
  };
  User.load(options, function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Ta uporabnik ne obstaja!'));
    req.profile = user;
    next();
  });
};

exports.create = function(req, res){
  var user = new User(req.body);
  user.save(function (err) {
    if (err) {
      return false; // redirect to create page
    }
  });
}

exports.redirectOnLogin = function(req, res){
  var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/' + req.user.type;
  delete req.session.redirectTo;
  res.redirect(redirectTo);
}

exports.studentHome = function(req, res){
  res.render('student/home', {user: req.use});
}



// show login
exports.showLogin = function(req, res){
  res.render('user/login', {message: req.flash('error')});
}
