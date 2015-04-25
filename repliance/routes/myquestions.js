var express = require('express');
var router = express.Router();

var dblib = require('../lib/db');

var users = require('./users');
var online = users.online;

router.get('/', function(req, res) {

  var user = req.session.user;
	  if (user === undefined || online[user.uid] === undefined) {
	    req.flash('auth', 'Not logged in!');
	    res.redirect('/user/login');
	  }
	  else {
	  	dblib.userQuest(user, function(error, data){
	  		if(user === undefined || online[user.uid] === undefined){
	  			req.flash('auth', 'Not logged in!');
	    		res.redirect('/user/login');
	  		}
	  		else{
	  			/*
				var htmlString = '<ul class = "questionList"> ';
	  			console.log(data);
	  			console.log(data.rows.length);
	  			for(var i = 0; i < data.rows.length; i++){
	  				var qid = data.rows[i].qid;
	  				var repliesTotal = data.rows[i].repliestotal;
	  				var repliesLimit = data.rows[i].replieslimit;
	  				var timeTotal = data.rows[i].timetotal;
	  				var timeLimit = data.rows[i].timelimit;
	  				var bodyText = data.rows[i].bodytext;
	  				var title = data.rows[i].title;

	  				htmlString = htmlString + '<li class = "questionElement"> <div class = "questionBox">' + 
	  											'<p class = "questTitle">' + title + '</p>' +
	  											'<p class = "questBody">' + bodyText + '</p>' +
	  											'<p class = "questRepLeft">' + repliesTotal + '</p>' +
	  											'<p class = "questRepLim">' + repliesLimit + '</p>' +
	  											'</div></li>';
	  			}
	  			htmlString = htmlString + '</ul>';
	  			*/
				
				
	  			res.render('myquestions', {title : 'My Questions',
										  username : user.username,
										  data : data
	  									   //myquestions : htmlString
										   });
	  		}
	  	});
	  	//res.render('myquestions', { title : 'My Questions'});
	  }
  });

module.exports = router;