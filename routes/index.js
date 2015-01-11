var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var monk = require('monk');

var db = monk('localhost:27017/aips_dev');



// PASSPORT CONFIG
passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    var users = db.get('users');
    users.findOne({
      username: username
    }).
    on('success', function(user) {
      if (!user)
        done(null, false);
      else {
        console.log(user.password + '!==' + bcrypt.hashSync(password, salt));
        if (!bcrypt.compareSync(password, user.password))
          done(null, false, {
            message: 'Napačno uporabniško ime ali geslo!'
          });
        else
          done(null, user);
      }
    }).
    on('error', function() {
      done(null, false, {
        message: 'Neznana napaka!'
      });
    })
  });

}));

passport.serializeUser(function(user, done) {
  console.log('serializing user');
  done(null, user._id);
});

passport.deserializeUser(function(userId, done) {
  console.log('deserializing user');
  db.get('users').findById(userId, function(err, user) {
    if(!req.session.userType){
      req.session.userType = "student";
      console.log("setting session type");
    }
    done(err, user);
  })
});


/* GET home page. */
router.get('/', function(req, res) {
  if(req.isAuthenticated())
    res.send('Pozdravljeni na AIPS spletni strani, '+ req.user.username +'!');
  else
    res.redirect('/login');
});

/* GET login page */
router.get('/login', function(req, res) {
  res.render('login', {
    title: 'Prijava v AIDS',
    message: req.flash('error')
  });
});
/** AUTHENTICATE USER **/
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/successLogin', function(req, res) {
  res.json(req.user);
})
router.get('/failLogin', function(req, res) {
  res.send('you fail');
});

/* GET logout */
router.get('/logout', function(req, res) {
  // TODO delete session
  res.send('working on it ;)');
});


//dev
router.get('/cryptit/:str', function(req, res) {
  res.json({
    hash: bcrypt.hashSync(req.params.str, salt),
    salt: salt
  })
})




module.exports = router;
