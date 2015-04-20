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

function generateQID(cb){
	console.log('in genQID');
	pg.connect(cstr, function(err, client, done) {
		if (err) {
				console.log('err in genQID');
			cb('error');
		}
		else {
			console.log('else in genQID');
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
* 
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

function addQuestion(uid, text, title, limit, cb) {
	console.log('addQ is called');
	pg.connect(cstr, function(err, client, done) {
		if (err) {
			console.log('error is here');
			cb('error!!!');
		}
		else {
			console.log('no error yet');

			generateQID(function(error, newQID) {

				console.log('new quid is ' + newQID);
				if (error){
					console.log('error');
					cb('error!');
				}

				else{
					console.log('making qstring now');
					var qstring = 'insert into questions values(' +
									newQID + ',\'' +	//qid
									uid + ',\'' +		//uid
									0  + ',\'' 			//repliesTotal
									limit + ',\'' +		//repliesLimit
									0 + ',\'' +			//timeTotal
									0 + ',\'' +			//timeLimit
									NULL + ',\'' +		//image
									text + ',\'' +		//bodyText
									title + ',\'' +		//title
									1					//status
									+ ')';
					console.log(qstring);
					client.query(qstring, function(err, result) {
							console.log('client.query');
							done();
							client.end();
							if (err) {
								console.log('error happened in cquery');
								cb('error');
							}
							else{
								console.log('worked in cquery');
								cb(undefined, newQID);
							}
					});
				}
			});
		}
	});
}

function generateQID(cb){

}


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






module.exports = {
  add     			: add,
  lookup			: lookup,
  accountInfo		: accountInfo,
  list    			: list,
  generateUID   	: generateUID,
  verifyUsername	: verifyUsername,
  addQuestion		: addQuestion
};
