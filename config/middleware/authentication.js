exports.requiresLogin = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  if (req.method == 'GET') req.session.redirectTo = req.originalUrl;
  res.redirect('/login');
}
exports.requiresStudentLogin = function(req, res, next) {
  if (req.isAuthenticated())
    if (req.user.type == 'student')
      return next();
    // if user not student redirect to index
  res.redirect('/');
}
