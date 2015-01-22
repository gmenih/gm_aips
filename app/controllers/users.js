var mongoose = require('mongoose');
var User = mongoose.model('User');
var Notification = mongoose.model('Notification');
var Program = mongoose.model('Program');
var Course = mongoose.model('Course');
var Grade = mongoose.model('Grade');

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
  var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/';
  delete req.session.redirectTo;
  res.redirect(redirectTo);
}

exports.studentHome = function(req, res){
  Notification.loadForUser({id: req.user._id, select:'title content date author'}, function(err, notifications){
    res.render('student/home', {user: req.user, obvestila: notifications});
  })
}
exports.studentCourses = function(req, res){
  var programId = req.user.program;
  var reDo = Grade.find({userId: req.user._id})
  .populate('course')
  .select('course grade')
  .exec(function(err, data){
    if(!data.length){
      Program.findOne({_id: programId})
      .select('courses')
      .populate('courses')
      .exec(function(err, program){
        program.courses.forEach(function(c){
          console.log('ID: %s', c._id);
          var grade = new Grade({userId: req.user._id, course:c._id, grade:0});
          console.log('Grade: %s', grade);
          grade.save();
        })
        reDo;
      })
    }
    else{
      res.render('student/courses', {data: data});
    }
  })
}

// show login
exports.showLogin = function(req, res){
  res.render('user/login', {message: req.flash('error')});
}

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
}

exports.professorHome = function(req, res){
  res.render('profesor/home');
}

exports.professorCourses = function(req, res){
  Course.find({holder: req.user._id})
  .select('name ECTS _id')
  .exec(function(err, courses){
    if(!err)
      res.render('profesor/courses', {courses: courses});
  })
}

exports.professorCourse = function(req, res){
  var courseId = req.params.courseId;
  console.log(courseId);
  Grade.find({course: courseId})
  .select('userId course grade')
  .populate('userId')
  .populate('course')
  .exec(function(err, data){
    res.render('profesor/students', {grades: data});
  })
}

exports.professorSaveGrades = function(req, res){
  var grade = req.body.grade;
  var userId = req.body.userId;
  var courseId = req.body.course;
  grade.forEach(function(g, index){
    Grade.findOneAndUpdate({userId:userId[index], course:courseId[index]}, {grade:g}, {}, function(err){
      var n = new Notification({title:'Nova ocena!', author:req.user._id, target: userId[index], content:'Nova ocena od profesorja! Dobil/a si: ' + g});
      n.save()
    });
  });
  res.redirect('/prof/course/'+courseId[0]);
}
