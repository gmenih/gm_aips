var mongoose = require('mongoose');
// models
var User = mongoose.model('User');
var Program = mongoose.model('Program');
var Course = mongoose.model('Course');

exports.showHome = function(req, res){
  res.render('referat/home');
}

exports.showAddUser = function(req, res) {
  res.render('referat/addUser');
}

exports.addUser = function(req, res) {
  var user = new User(req.body);
  console.log("User: %s", user);
  user.save(function(err, user){
    if(err) return res.json(err);
    req.flash('info', 'Uporabnik dodan.');
    res.redirect('/referat/users');
  })
}

exports.showUsers = function(req, res){
  User.loadAll("username email name lastname _id type", function(err, users){
    console.log(users);
    if(err)
      res.send('error');
    res.render('referat/users', {data: users, info: req.flash('info')});
  })
}
