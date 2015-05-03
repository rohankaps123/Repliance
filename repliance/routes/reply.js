var express = require('express');
var router = express.Router();

var dblib = require('../lib/db');

var users = require('./users');
var online = users.online;

/**
*  Post A New Question
**/


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
