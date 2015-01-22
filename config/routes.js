var auth = require('./auth');

var users = require('../app/controllers/users');
var referat = require('../app/controllers/referat');

module.exports = function(app, passport){
  app.get('/', auth.requiresLogin, function(req, res){
    if(req.user.type == 'student')
      res.redirect('/student');
    else if(req.user.type === 'professor')
      res.redirect('/prof');
    else
      res.send('penis');
  });

  app.get('/login', users.showLogin);

  app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: "Uporabniško ime in geslo se ne ujemata!"
  }), users.redirectOnLogin);

  app.get('/student', auth.requiresStudentLogin, users.studentHome);
  app.get('/student/courses', auth.requiresStudentLogin, users.studentCourses);
  //app.get('/student/exams', auth.requiresStudentLogin, users.studentExams);
  app.get('/logout', auth.requiresLogin, users.logout);

  /** PROFESOR */
  app.get('/prof', auth.requiresProfessorLogin, users.professorHome);
  app.get('/prof/courses', auth.requiresProfessorLogin, users.professorCourses);
  app.get('/prof/course/:courseId', auth.requiresProfessorLogin, users.professorCourse);
  app.post('/prof/saveGrades', users.professorSaveGrades);




  /** REFERAT **/
  app.get('/referat', referat.showHome);
  app.get('/referat/addUser', referat.showAddUser);
  app.post('/referat/addUser', referat.addUser);
  app.get('/referat/users', referat.showUsers);
  app.get('/referat/programs', referat.showPrograms);
  app.get('/referat/addProgram', referat.showAddProgram);
  app.post('/referat/addProgram', referat.addProgram);
  app.get('/referat/courses', referat.showCourses);
  app.get('/referat/addCourse', referat.showAddCourse);
  app.post('/referat/addCourse', referat.addCourse);



  // error handlng
  app.use(function(req, res, next) {
    var err = new Error('404');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
