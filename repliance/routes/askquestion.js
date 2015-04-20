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
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
  res.render('askquestion', { title : 'Ask Question'});
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

      console.log(title + ' ' + text + ' ' + plimit);

    	//dblib.addQuestion(

    	//);
  
		res.redirect('/myquestions');

	}
});
















module.exports = router;