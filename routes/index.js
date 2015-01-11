var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.send('Pozdravljeni na AIPS spletni strani!');
});

/* GET login page */
router.get('/login', function(req, res){
  res.render('login', {title: 'Prijava'});
});

/* POST login */
router.post('/login', function(req, res){
  //TODO creaate session
  res.send('working on it ;)');
});
/* GET logout */
router.get('/logout', function(req, res){
  // TODO delete session
  res.send('working on it ;)');
});

module.exports = router;
