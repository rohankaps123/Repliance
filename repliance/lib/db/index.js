var pg = require('pg');

var cstr = 'postgres://postgres:postgres@localhost/repliance';

/**
 * This function adds a user to the database.
 */

function addOld(uid, username, password, fname, lname, cb) {
	pg.connect(cstr, function(err, client, done) {
		if (err) {
			cb(err);
		}
		else {
			console.log('we got here now');
			var qstring = 'insert into users values(' +
							uid + ',\'' +
							username + '\',\'' +
							password + '\',\'' +
							fname + '\',\'' +							
							lname + '\',' +
							'0)';
			console.log('we got here now6');
			console.log(qstring);
			client.query(qstring, function(err, result) {
				console.log('we got here now2');
				done();
				console.log('we got here now3');
				client.end();
				console.log('we got here now4');
				if (err) {
					console.log('we got here now 4.5');
					cb(err);
				}
				else{
					cb(undefined);
				}
				console.log('we got here now5');
			});
		}
	});
}

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
							cb(err);
						}
					}
					else{
						console.log('lookup we got here');
						cb('User does not exist');
					}
				}
			});
		}
	});
}

function verifyUsername(username, cb) {
	console.log('verifyUsername');
	pg.connect(cstr, function(err, client, done) {
		if (err) {
			cb('error!');
		}
		else {
			var qstring = 'select * from users where username = \'' + username + '\'';
			client.query(qstring, function(err, result) {
				console.log('aghghhhhh');
				console.log('verify query result ' + result);
				done();
				client.end();
				if (err) {
					console.log('hey');
					cb('error!');
				}
				else{
					if (result.rows[0] !== undefined){
						console.log('found user');
						if(result.rows[0].username === username){
							console.log('username exists');
							cb(undefined, result.rows[0].username);
						}
						else{
							console.log('username es not taken');
							cb('error!');
						}
					}
					else{
						console.log('lookup we got here');
						cb('User does not exist');
					}
				}
			});
		}
	});
}

function generateUID(cb){
	console.log('got to start of uid gen');
	pg.connect(cstr, function(err, client, done) {
		console.log('got to start of uid gen connect');
		if (err) {
			cb(err);
		}
		else {
			var qstring = 'select * from users order by uid desc';
			client.query(qstring, function(err, result) {
				console.log('generateUID qstring is ' + qstring);
				console.log('got to start of uid gen query');
				console.log('query result is ' + result);
				done();
				client.end();
				console.log('query result is ' + result);
				//console.log(result.rows[0].uid);
				if(err){
					console.log('got to uid gen query err');
					cb(err);
				}
				else{
					var newUID = result.rows[0].uid + 1;
					console.log('newUID is ' + newUID);
					cb(undefined, newUID);
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
				console.log('select * from users where username=' + '\'' + user.username + '\'');
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

function addQuestion(uid, text, title, cb) {
	pg.connect(cstr, function(err, client, done) {
		if (err) {
			cb(err);
		}
		else {
			var qstring = 'insert into questions values(' +
//qid							
//uid
//repliesTotal
//repliesLimit
//timeTotal
//timeLimit
//image
//bodyText
//title
//status
							+ ')';
			client.query(qstring, function(err, result) {
				done();
				client.end();
				if (err) {
					cb(err);
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

						console.log('we got here now');
						var qstring = 'insert into users values(' +
										newUID + ',\'' +
										username + '\',\'' +
										password + '\',\'' +
										fname + '\',\'' +							
										lname + '\',' +
										'0)';
						console.log('we got here now6');
						console.log(qstring);
						client.query(qstring, function(err, result) {
							console.log('we got here now2');
							done();
							console.log('we got here now3');
							client.end();
							console.log('we got here now4');
							if (err) {
								console.log('we got here now 4.5');
								cb(err);
							}
							else{
								console.log('we got here now 4.75');
								cb(undefined, newUID);
							}
							console.log('we got here now5');
						});
				}
			});
		}
	});
}






module.exports = {
  add     			: add,
  addOld			: addOld,
  lookup			: lookup,
  accountInfo		: accountInfo,
  list    			: list,
  generateUID   	: generateUID,
  verifyUsername	: verifyUsername
};
