var express = require('express');
var router = express.Router();

var dblib = require('../lib/db');

var users = require('./users');
var online = users.online;

/**
*  Post A New Question
**/

router.get('/', function(req, res) {
  var user = req.session.user;
  var username = user.username;
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
  res.render('askquestion', { title : 'Ask Question', username: username});
}
});

router.post('/askquestion', function(req, res) {

	var user = req.session.user;
  
	if (user === undefined || online[user.uid] === undefined) {
    	req.flash('auth', 'Not logged in!');
    	res.redirect('/user/login');
	}

	else {

      var id = user.uid;

		  //Pull values from form
		  var title = req.body.qTitle;
    	var text = req.body.qText;
      var plimit = req.body.postlimit;
      var limitValue;

      if (plimit === 'five'){
        limitValue = 5;
      }
      else if (plimit === 'ten'){
        limitValue = 10;
      }
      else if (plimit === 'fifteen'){
        limitValue = 15;
      }
      else{
        limitValue = 20;
      }

      console.log(title + ' ' + text + ' ' + plimit);

    	dblib.addQuestion(id, text, title, limitValue, function(error, data){
        console.log('here we are');
        if (error){
          console.log('error occurred');
          res.redirect('/askquestion');
        }
        else{
          console.log('seems to have worked');
          res.redirect('/myquestions');

        }

      });

	}
});
















module.exports = router;