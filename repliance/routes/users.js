var express = require('express');
var router = express.Router();

var dblib = require('../lib/db');

// A logged in "database":
var online = {};
router.online = online;

// # User Server-Side Routes

// ## login
// Provides a user login view.
router.get('/login', function(req, res){
  // Grab any messages being sent to use from redirect.
  var authmessage = req.flash('auth') || '';
  var makemessage = req.flash('createauth') || '';

  // TDR: redirect if logged in:
  var user  = req.session.user;

  // TDR: If the user is already logged in - we redirect to the
  // main application view. We must check both that the `userid`
  // and the `online[userid]` are undefined. The reason is that
  // the cookie may still be stored on the client even if the
  // server has been restarted.
  if (user !== undefined && online[user.uid] !== undefined) {
    res.redirect('/main');
  }
  else {
    // Render the login view if this is a new login.
    res.render('login', { title   : 'Welcome to Repliance',
                          message : authmessage,
                          createmessage : makemessage });
  }
});

// ## auth
// Performs **basic** user authentication.
router.post('/auth', function(req, res) {

  var user = req.session.user;

  // do the check as described in the `exports.login` function.
  if (user !== undefined && online[user.uid] !== undefined) {
    res.redirect('/main');
  }
  else {
    // Pull the values from the form.
    var username = req.body.username;
    var password = req.body.password;
    // Perform the user lookup.
    dblib.lookup(username, password, function(error, user) {
      if (error) {
        // If there is an error we "flash" a message to the
        // redirected route `/user/login`.
        req.flash('auth', error);
        res.redirect('/user/login');
      }
      else {
        req.session.user = user;
        // Store the user in our in memory database.
        online[user.uid] = user;
        // Redirect to main.
        res.redirect('/main');
      }
    });
  }
});


// ## logout
// Deletes user info & session - then redirects to login.
router.get('/logout', function(req, res) {
  var user = req.session.user;
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
    return;
  }

  if (online[user.uid] !== undefined) {
    delete online[user.uid];
  }

  delete req.session.user;
  res.redirect('/user/login');
});

router.post('/create', function(req, res){
  var user = req.session.user;
  if (user !== undefined && online[user.uid] !== undefined) {
    res.redirect('/main');
  }
  else {
    var username = req.body.username;
    var password = req.body.password;
    var fname = req.body.fname;
    var lname = req.body.lname;

    if(username === '' || password == ''){
      req.flash('createauth', 'Fields must not be blank');
      res.redirect('/user/login');
    }
    else if(/[^A-Za-z0-9]/.test(username) || /[^A-Za-z0-9]/.test(password) || /[^A-Za-z0-9]/.test(fname) || /[^A-Za-z0-9]/.test(lname)){
      req.flash('createauth', 'Fields must contain only letters and numbers');
      res.redirect('/user/login');
    }
    else{

      dblib.lookup(username, password, function(error, user){
        if(error === undefined){
          req.flash('createauth', 'User already exists');
          res.redirect('/user/login');
        }
        else{
          /**dblib.generateUID(function(error, uid){
            if(error){
              req.flash('createauth', error);
              res.redirect('/user/login');
            }
            else{**/
              dblib.add(322, username, password, fname, lname, function(error, user) {
              if(error) {
                  req.flash('createauth', error);
                  res.redirect('/user/login');
                }
                else{
                  req.session.user = user;
                  online[user.uid] = user;
                  res.redirect('/main');
                }
              });
            //}       
          }//);
        //}
      });
    }
  }
});

module.exports = router;
