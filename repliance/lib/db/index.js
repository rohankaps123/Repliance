var pg = require('pg');

var cstr = 'postgres://postgres:postgres@localhost/repliance';


/**
 * This function looks up a particular user in the databse (login/authentication)
 */

function lookup(username, password, cb) {
	pg.connect(cstr, function(err, client, done) {
		if (err) {
			cb(err);
		}
		else {
			var qstring = 'select * from users where username = \'' + username + '\'';
			client.query(qstring, function(err, result) {
				done();
				client.end();
				if (err) {
					cb(err);
				}
				else{
					if (result.rows[0] !== undefined){
						if((result.rows[0].password === password) && (result.rows[0].username === username)){
							cb(undefined, result.rows[0]);
						}
						else{
							cb('Invalid password');
						}
					}
					else{
						cb('User does not exist');
					}
				}
			});
		}
	});
}

/**
 * This function looks up a particular user in the databse (account creation)
 */

function verifyUsername(username, cb) {
	pg.connect(cstr, function(err, client, done) {
		if (err) {
			cb('error!');
		}
		else {
			var qstring = 'select * from users where username = \'' + username + '\'';
			client.query(qstring, function(err, result) {
				done();
				client.end();
				if (err) {
					cb('error!');
				}
				else{
					if (result.rows[0] !== undefined){
						if(result.rows[0].username === username){
							cb(undefined, result.rows[0].username);
						}
						else{
							cb('error!');
						}
					}
					else{
						cb('User does not exist');
					}
				}
			});
		}
	});
}

/**
 * This function generates a unique user id number for a new user
 */

function generateUID(cb){
	pg.connect(cstr, function(err, client, done) {
		if (err) {
			cb(err);
		}
		else {
			var qstring = 'select * from users order by uid desc';
			client.query(qstring, function(err, result) {
				done();
				client.end();
				if(err){
					cb(err);
				}
				else{
					var newUID = result.rows[0].uid + 1;
					cb(undefined, newUID);
				}
			});
		}
	});
}

/**
 * This function generates a unique id number for a new question
 */

function generateQID(cb){
	pg.connect(cstr, function(err, client, done) {
		if (err) {
			cb('error');
		}
		else {
			var qstring = 'select * from questions order by qid desc';
			client.query(qstring, function(err, result) {
				done();
				client.end();
				if(err){
					cb('error');
				}
				else{
					var newQID = result.rows[0].qid + 1;
					cb(undefined, newQID);
				}
			});
		}
	});
}

/**
 * This function generates a unique id number for a new answer
 */

function generateAID(cb){
	pg.connect(cstr, function(err, client, done) {
		if (err) {
			cb(err);
		}
		else {
			var qstring = 'select * from answers order by aid desc';
			client.query(qstring, function(err, result) {
				done();
				client.end();
				if(err){
					cb(err);
				}
				else{
					var newAID = result.rows[0].aid + 1;
					cb(undefined, newAID);
				}
			});
		}
	});
}


/**
 * This function returns a list of all users in the database.
 */

function list(cb) {
	pg.connect(cstr, function(err, client, done) {
		if (err) {
			cb(err);
		}
		else {
			client.query('select * from users', function(err, result) {
				done();
				client.end();
				if (err) {
					cb(err);
				}
				else {
					cb(result.rows);
				}
			});
		}
	});
}

/**
 * This function returns the account information about a particular user
 */

function accountInfo(user, cb){

	pg.connect(cstr, function(err, client, done){

		if(err){
			cb(err);
		}
		else{
			client.query(('select * from users where username=' + '\'' + user.username + '\''), function(err, result){
				done();
				client.end();
				if (err){
					cb(err);
				}
				else{
					cb(result.rows);
				}
			});
		}
	});
}


/**
 * This function adds a new question to the questions table
 */

function addQuestion(uid, text, title, limit, cb) {
	pg.connect(cstr, function(err, client, done) {
		if (err) {
			cb('error!!!');
		}
		else {
			generateQID(function(error, newQID) {
				if (error){
					cb('error!');
				}

				else{/*
					var query = client.query('insert into questions values(($1),($2),($3),($4),($5),($6),($7),($8),($9),($10));',
					[newQID, uid, 0, limit, 0, 0, null, text, title, 1]);
					
					query.on('end', function () {
						client.end();
						return cb(null);
						});
					
					*/
					var qstring = 'insert into questions values(' +
									newQID + ',' +	//qid
									uid + ',' +		//uid
									0  + ',' +			//repliesTotal
									limit + ',' +		//repliesLimit
									0 + ',' +			//timeTotal
									0 + ',' +			//timeLimit
									null + ',\'' +		//image
									text + '\',\'' +		//bodyText
									title + '\',' +		//title
									1					//status
									+ ')';
					
					console.log(qstring);
					client.query(qstring, function(err, result) {
							done();
							client.end();
							if (err) {
								cb('error');
							}
							else{
								cb(undefined, newQID);
							}
					});
				
				}
			});
		}
	});
}

/**
 * This function adds a new user to the database (Sing Up)
 */

function add(username, password, fname, lname, cb) {
	pg.connect(cstr, function(err, client, done) {
		if (err) {
			cb(err);
		}
		else {

			generateUID(function(error, newUID) {

				if (error){
					cb(error);
				}

				else{
						var qstring = 'insert into users values(' +
										newUID + ',\'' +
										username + '\',\'' +
										password + '\',\'' +
										fname + '\',\'' +
										lname + '\',' +
										'0)';
						client.query(qstring, function(err, result) {
							done();
							client.end();
							if (err) {
								cb(err);
							}
							else{
								cb(undefined, newUID);
							}
						});
				}
			});
		}
	});
}

/**
 * This function returns a list of all the questions a user has asked (My Questions)
 */

function userQuest(user, cb){
	pg.connect(cstr, function(err, client, done){
		if(err){
			cb(err);
		}
		else{
			var uid = user.uid;
			var qstring = 'select * from questions where uid =' + uid +' order by qid desc';
			client.query(qstring, function(err, result){
				done();
				client.end();
				console.log(result);
				if(err){
					console.log('error');
					dc(err);
				}
				else{
					console.log('result');
					cb(undefined, result);
				}
			});
		}
	});
}

/**
 * This function returns a list of all the answers a user has written (My Answers)
 */

function userAns(user, cb){
	pg.connect(cstr, function(err, client, done){
		if(err){
			cb(err);
		}
		else{
			var uid = user.uid;
			var qstring = 'select * from answers where uid =' + uid +' order by qid desc';
			client.query(qstring, function(err, result){
				done();
				client.end();
				console.log(result);
				if(err){
					console.log('error');
					dc(err);
				}
				else{
					console.log('result');
					cb(undefined, result);
				}
			});
		}
	});
}

/**
 * Export the functions used in other parts of the app
 */

module.exports = {
  add     			: add,
  lookup			: lookup,
  accountInfo		: accountInfo,
  list    			: list,
  generateUID   	: generateUID,
  verifyUsername	: verifyUsername,
  addQuestion		: addQuestion,
  userQuest			: userQuest,
  userAns			: userAns
};
