var express = require('express');
var router = express.Router();

var dblib = require('../lib/db');

var users = require('./users');
var online = users.online;

// ## account
// The account view.

router.get('/', function(req, res) {

  var user = req.session.user;
  var userData;

  dblib.accountInfo(user, function(data){

    var element = Object.keys(data[0]);

    var row = data[0];

    var uid = row[element[0]];
    var username = row[element[1]];
    var password = row[element[2]];
    var fname = row[element[3]];
    var lname = row[element[4]];
    var score = row[element[5]];

    if (user === undefined || online[user.uid] === undefined) {
      req.flash('auth', 'Not logged in!');
      res.redirect('/user/login');
    }
    else {
      res.render('account', { title   : 'Account',
                            username  : username,
                            password  : password,
                            fname     : fname,
                            lname     : lname,
                            score     : score

                          });
    }
  });
});

module.exports = router;