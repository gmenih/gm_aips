var students = require('./controllers/students');
var auth = require('./middleware/authentication');

module.exports = function(app, passport) {
  /** GET **/
  // login
  app.get('/login', function(req, res) {
    res.render('login', {
      title: 'Prijava v AIDS',
      message: req.flash('error')
    });
  });
  // index
  app.get('/', auth.requiresLogin, function(req, res) {
    if (req.user.type == 'student')
      res.redirect('/student');
    else if (req.user.type = 'professor')
      res.send('working on it ;)');
  });

  app.get('/student', auth.requiresStudentLogin, students.home);
  app.get('/student/courses', auth.requiresStudentLogin, students.courses);

  /** POST **/
  //login
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));


  app.use(function(req, res, next) {
    var err = new Error('Phau Ov Phau');
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
      error: {}
    });
  });

}
