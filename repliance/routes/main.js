var express = require('express');
var router = express.Router();

var dblib = require('../lib/db');

var users = require('./users');
var online = users.online;

// ## main
// The main user view.
router.get('/', function(req, res) {
  // added session support
  var user = req.session.user;
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    res.render('main', { title   : 'User Main',
                         message : 'Login Successful',
                         username : user.username,
                         password : user.password });
  }
});

module.exports = router;