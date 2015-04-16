var pg = require('pg');

var cstr = 'postgres://postgres:postgres@localhost/repliance';

/**
 * This function adds a user to the database.
 */
function add(user, cb) {
	pg.connect(cstr, function(err, client, done) {
		if (err) {
			cb(err);
		}
		else {
			var qstring = 'insert into users values(' +
							user.uid + ',\'' +
							user.username + ',\''
							user.password + '\',\'' +
							user.fname + '\',\'' +							
							user.lname + '\',' +
							user.score + ')';
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


module.exports = {
  add     : add,
  list    : list,
};
