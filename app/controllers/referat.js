var mongoose = require('mongoose');
// models
var User = mongoose.model('User');
var Program = mongoose.model('Program');
var Course = mongoose.model('Course');

exports.showHome = function(req, res){
  res.render('referat/home');
}

exports.showUserForm = function(req, res) {
  res.render('referat/addUser');
}

exports.addUser = function(req, res) {
  var user = new User(res.body);
  user.save(function(err, user) {
    if (err) {
      res.render('referat/addUser', {
        data: res.body
      });
    }
  });
  res.render('referat/students', {
    message: 'Uporabnik dodan.'
  });
}
