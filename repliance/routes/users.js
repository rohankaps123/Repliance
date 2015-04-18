var express = require('express');
var router = express.Router();

var userlib = require('../lib/user');
var dblib = require('../lib/db');

// A logged in "database":
var online = {};

// # User Server-Side Routes

// ## login
// Provides a user login view.
router.get('/login', function(req, res){
  // Grab any messages being sent to use from redirect.
  var authmessage = req.flash('auth') || '';

  // TDR: redirect if logged in:
  var user  = req.session.user;

  // TDR: If the user is already logged in - we redirect to the
  // main application view. We must check both that the `userid`
  // and the `online[userid]` are undefined. The reason is that
  // the cookie may still be stored on the client even if the
  // server has been restarted.
  if (user !== undefined && online[user.uid] !== undefined) {
    res.redirect('/user/main');
  }
  else {
    // Render the login view if this is a new login.
    res.render('login', { title   : 'User Login',
                          message : authmessage });
  }
});

// ## auth
// Performs **basic** user authentication.
router.post('/auth', function(req, res) {

  /**
  // redirect if logged in:
  var user = req.session.user;

  // do the check as described in the `exports.login` function.
  if (user !== undefined && online[user.uid] !== undefined) {
    res.redirect('/user/main');
  }
  else {
    // Pull the values from the form.
    var username = req.body.username;
    var password = req.body.password;
    // Perform the user lookup.
    userlib.lookup(username, password, function(error, user) {
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
        res.redirect('/user/main');
      }
    });
  }

  **/

  //NEW AUTH CODE//

  var user = req.session.user;

  // do the check as described in the `exports.login` function.
  if (user !== undefined && online[user.uid] !== undefined) {
    res.redirect('/user/main');
  }
  else {
    // Pull the values from the form.
    var username = req.body.username;
    var password = req.body.password;
    // Perform the user lookup.
    dblib.lookup(username, password, function(error, user) {
      console.log("Database looked up from users.js");
      if (error) {
        console.log("error oh no");
        // If there is an error we "flash" a message to the
        // redirected route `/user/login`.
        req.flash('auth', error);
        res.redirect('/user/login');
      }
      else {
        console.log("Should be sent to main now");
        console.log(user);
        req.session.user = user;
        // Store the user in our in memory database.
        online[user.uid] = user;
        // Redirect to main.
        res.redirect('/user/main');
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

// ## main
// The main user view.
router.get('/main', function(req, res) {
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

///////////////////////////////////////////////////////
///////////                                 ///////////
///////////            ACCOUNT              ///////////
///////////                                 ///////////
///////////////////////////////////////////////////////

router.get('/account', function(req, res) {

  var user = req.session.user;
  var userData;

  dblib.list(function(data){

    var element = Object.keys(data[0]);

    var d = data[0];

    var uid = d[element[0]];
    var usn = d[element[1]];

    console.log('data: ' + uid + ' ' + usn);

    userData = usn;

    if (user === undefined || online[user.uid] === undefined) {
      req.flash('auth', 'Not logged in!');
      res.redirect('/user/login');
    }
    else {
      res.render('account', { title : 'Account',
                            people: userData});
    }

  });

});








router.get('/myquestions', function(req, res) {

  var user = req.session.user;
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
  res.render('myquestions', { title : 'My Questions'});
}
});

router.get('/myanswers', function(req, res) {

  var user = req.session.user;
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
  res.render('myanswers', { title : 'My Answers'});
}
});

router.get('/askquestion', function(req, res) {
  var user = req.session.user;
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
  res.render('askquestion', { title : 'Ask Question'});
}
});

module.exports = router;