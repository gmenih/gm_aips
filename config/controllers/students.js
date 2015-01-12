
exports.home = function(req, res){
  res.render('student/home', {user: req.user});
}

exports.courses = function(req, res){
  //TODO get courses
  res.render('student/courses');
}
