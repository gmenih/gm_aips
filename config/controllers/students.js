exports.home = function(req, res) {
  res.render('student/home', {
    user: req.user,
    obvestila: null
  });
}

exports.courses = function(req, res) {
  //TODO get courses
  var db = req.db;
  var user = req.user;
  // študentov program
  db.get('programs').findById(req.user.program).
  on('success', function(program) {
    // če ni vpisan je error
    if (!program) {
      req.flash('error', 'Študent ni vpisan v noben program!');
      res.redirect('/');
    }
    // poiščem vsak predmet v programu
    db.get('courses').find({_id: {$in: program.courses}}, function(err, doc){
      res.render('student/courses', {user: user, program: program, courses: doc});
    });
    // renderam stran z uporabnikom, programom in predmeti
  }).
  on('error', function() {
    req.flash('error', 'Študent ni vpisan v noben program!');
    res.redirect('/');
  })
}
