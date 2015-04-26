var express = require('express');
var router = express.Router();

var dblib = require('../lib/db');

var users = require('./users');
var online = users.online;

// ## main
// The main user view.
router.get('/', function(req, res) {
  var user = req.session.user;
    if (user === undefined || online[user.uid] === undefined) {
      req.flash('auth', 'Not logged in!');
      res.redirect('/user/login');
    }
    else {
      dblib.openQuestions(user, function(error, data){
        if(user === undefined || online[user.uid] === undefined){
          req.flash('auth', 'Not logged in!');
          res.redirect('/user/login');
        }
        else{
          res.render('main', {title : 'Repliance',
                      username : user.username,
                      message : '',
                      data : data });
        }
      });
    }
  });

module.exports = router;