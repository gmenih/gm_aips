var config = require('./config');


// should be logged in
exports.requiresLogin = function(req, res, next) {
  if (req.isAuthenticated()) return next()
  if (req.method == 'GET') req.session.returnTo = req.originalUrl
  res.redirect('/login')
}

exports.requiresStudentLogin = function(req, res, next){
  if(req.isAuthenticated() && req.user.type === 'student') return next();
  if(req.method == 'GET') req.session.returnTo = req.originalUrl;
  res.redirect('/login');
}
exports.requiresProfessorLogin = function(req, res, next){
  if(req.isAuthenticated() && req.user.type === 'professor') return next();
  if(req.method == 'GET') req.session.returnTo = req.originalUrl;
  res.redirect('/login');
}
