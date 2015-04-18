var pg = require('pg');

var cstr = 'postgres://postgres:postgres@localhost/repliance';

/**
 * This function adds a user to the database.
 */

function add(uid, username, password, fname, lname, cb) {
	pg.connect(cstr, function(err, client, done) {
		if (err) {
			cb(err);
		}
		else {

			var qstring = 'insert into users values(' +
							uid + ',\'' +
							username + ',\''
							password + '\',\'' +
							fname + '\',\'' +							
							lname + '\',' +
							score + ')';
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
					if (result.rows !== undefined){
						if((result.rows[0].password === password) && (result.rows[0].username === username)){
							cb(undefined, result.rows[0]);
						}
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
			client.query(qstring, function(err, result){
				done();
				client.end();
				if(err){
					cb(err);
				}
				else{
					var newUID = result.rows[0].uid + 1;
					cb(newUID);
				}
			});
		}
	}
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


module.exports = {
  add     		: add,
  lookup		: lookup,
  accountInfo	: accountInfo,
  list    		: list,
};
