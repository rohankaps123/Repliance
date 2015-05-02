var express = require('express');
var router = express.Router();

var dblib = require('../lib/db');

var users = require('./users');
var online = users.online;

router.get('/', function(req, res){
	var user = req.session.user;
	var qid = req.query.qid;
	console.log(qid);
	if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
  	} 
  	else {
  		dblib.getReplies(qid, user.uid, function(error, data){
  			if(error){
  				req.flash('showReplies', error);
  				res.redirect('/myquestions');
  			}
  			else{
  				console.log(data);
  				res.render('question', {username : user.username,
  										answers : data});
  			}
  		});
  	}
});

router.get('/upvote', function(req, res){
	var user = req.session.user;
	var aid = req.query.aid;
	var qid = req.query.qid;
	console.log(aid);
	if(user === undefined || online[user.uid] === undefined) {
		req.flash('auth', 'Not logged in!');
		res.redirect('/user/login');
	}
	else {
		dblib.upvote(aid, user.uid, function(error, data){
			if(error){
				req.flash('upVote', error);
				res.redirect('/question?qid=<%qid&>');
			}
			else{
				res.redirect('/question?qid=<%qid%>');
			}
		});
	}
});

router.get('/downvote', function(req, res){
	var user = req.session.user;
	var aid = req.query.aid;
	console.log(aid);
	if(user === undefined || online[user.uid] === undefined) {
		req.flash('auth', 'Not logged in!');
		res.redirect('/user/login');
	}
	else {
		dblib.downvote(aid, user.uid, function(error, data){
			if(error){
				req.flash('upVote', error);
				res.redirect('/question?qid=<%qid&>');
			}
			else{
				res.redirect('/question?qid=<%qid%>');
			}
		});
	}
});

module.exports = router;