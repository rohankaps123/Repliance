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
  var qid = req.query.qid;
  console.log(qid);
  var username = user.username;
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
  } else {
	dblib.openQuestions(user, function(error, data){
	  if(error){
		req.flash('reply', error);
		res.redirect('/reply?qid='+qid);
	  } else {
		var question = {qid : qid,
					  title : data.rows[0].title,
					  bodytext : data.rows[0].bodytext,
					  repliestotal : data.rows[0].repliestotal,
					  replieslimit : data.rows[0].replieslimit};
		res.render('reply', { title : 'Reply to a Question',
				   username: username,
				   score : user.score,
				   question : question});
	  }
	});
  }
});

router.post('/reply', function(req, res) {

	var user = req.session.user;

	if (user === undefined || online[user.uid] === undefined) {
      req.flash('auth', 'Not logged in!');
      res.redirect('/user/login');
	} else {

	  var uid = user.uid;
	  //Pull values from form
	  var qid = req.body.qid;
      var text = req.body.aText;
      dblib.addAnswer(qid, uid, text, function(error, data){
      if (error){
		req.flash('reply', error);
        res.redirect('/main');
      } else{
          res.redirect('/myanswers');
      }
    });
  }
});



module.exports = router;
