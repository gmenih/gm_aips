var mongoose = require('mongoose');
// models
var User = mongoose.model('User');
var Program = mongoose.model('Program');
var Course = mongoose.model('Course');

exports.showHome = function(req, res) {
  res.render('referat/home');
}

exports.showUsers = function(req, res) {
  User.loadAll({where:{}, select:"username email name lastname _id type"}, function(err, users) {
    console.log(users);
    if (err)
      res.send('error');
    res.render('referat/users', {
      data: users,
      info: req.flash('info')
    });
  })
}


exports.showAddUser = function(req, res) {
  Program.loadAll("_id name", function(err, data) {
    if (!err)
      res.render('referat/addUser', {
        programs: data
      });
    else
      res.json(err);
  });

}

exports.addUser = function(req, res) {
  var user = new User(req.body);
  console.log("User: %s", user);
  user.save(function(err, user) {
    if (err) return res.json(err);
    req.flash('info', 'Uporabnik dodan.');
    res.redirect('/referat/users');
  })
}

exports.showPrograms = function(req, res) {
  Program.loadAll("_id name owner courses", function(err, programs) {
    if (err)
      res.send(err.name);
    res.render('referat/programs', {
      programs: programs,
      info: req.flash('info')
    })
  })
}

exports.showAddProgram = function(req, res) {
  Course.loadAll("_id name", function(err, courses) {
    if (!err)
      res.render('referat/addProgram', {
        courses: courses
      });
    else
      res.send(err.name);
  })

}

exports.addProgram = function(req, res) {
  var program = new Program(req.body);
  program.save(function(err, program) {
    if (err)
      res.json(err);
    else {
      req.flash('info', 'Letnik dodan.');
      res.redirect('/referat/programs');
    }
  });
}

exports.showCourses = function(req, res){
  Course.loadAll("_id name ECTS holder", function(err, courses){
    if(err)
      res.json(err);
    console.log('Courses: %s', courses);
    res.render('referat/courses', {courses: courses});
  })
}

exports.showAddCourse = function(req, res){
  User.loadAll({where:{type:'professor'}, select:"_id name lastname"}, function(err, users){
    if(err)
      res.json(err);
    console.log('AddCourse Users: %s', users);
    res.render('referat/addCourse', {professors: users});
  })
}

exports.addCourse = function(req, res){
  var course = new Course(req.body);
  console.log("Body: %s", req.body);
  course.save(function(err, course){
    if(err)
      res.redirect('/referat/addCourse');
    res.redirect('/referat/courses');
  })
}
