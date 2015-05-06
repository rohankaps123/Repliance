var pg = require('pg');

var cstr = 'postgres://postgres:postgres@localhost/repliance';


/**
 * This function looks up a particular user in the databse (login/authentication)
 */

function lookup(username, password, cb) {
    pg.connect(cstr, function(err, client, done) {
		if (err) {
			//console.log(err);
			cb(err);
		} else {
		    //using bind variables to prevent sql injection
			var qstring = 'select * from users where username = ($1)';
		    client.query(qstring, [username], function(err, result) {
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
			var qstring = 'select * from users where username = ($1)';
			client.query(qstring, [username], function(err, result) {
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
			//var qstring = 'select * from users order by uid desc';
			var qstring = 'select nextval(\'seq_users\') as uid';
			client.query(qstring, function(err, result) {
				done();
				client.end();
				if(err){
					cb(err);
				}
				else{
					var newUID = result.rows[0].uid;
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
		} else {
			var qstring = 'select nextval(\'seq_questions\') as qid';
			client.query(qstring, function(err, result) {
				done();
				client.end();
				if(err){
					cb('error');
				} else {
					var newQID = result.rows[0].qid;
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
		} else {
		    var qstring = 'select nextval(\'seq_answers\') as aid';
			//var qstring = 'select * from answers order by aid desc';
			client.query(qstring, function(err, result) {
				done();
				client.end();
				if(err){
					cb(err);
				} else {
					var newAID = result.rows[0].aid;
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
		} else {
			client.query('select * from users', function(err, result) {
				done();
				client.end();
				if (err) {
					cb(err);
				} else {
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
		} else {
			client.query(('select * from users where username=($1)'), [user.username], function(err, result){
				done();
				client.end();
				if (err){
					cb(err);
				} else {
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
		} else {
			generateQID(function(error, newQID) {
				if (error){
					cb('error!');
				} else {
				    var qstring = 'insert into questions values(($1),($2),($3),($4),($5),($6),($7),($8),($9),($10));';
					client.query(qstring,  [newQID, uid, 0, limit, 0, 0, null, text, title, 0], function(err, result) {
							done();
							client.end();
							if (err) {
								cb('error');
							} else {
								cb(undefined, newQID);
							}
					});

				}
			});
		}
	});
}



/**
 * This function adds a new answer to the answers table
 */

function addAnswer(qid, uid, text, cb) {
	pg.connect(cstr, function(err, client, done) {
		if (err) {
			cb(err);
		} else {
			generateAID(function(error, newAID) {
				if (error){
					cb(error);
				} else {
					var qstring0 = 'select * from questions where qid = '+ qid;
					client.query(qstring0, function(err, result){
						done();
						if(result.rows[0].uid === uid){
							cb(err);
						}
						else if(result.rows[0].status === 1){
							cb(err);
						}
						else{
							var qstring00 = 'select * from questions inner join qa on questions.qid = qa.qid inner join answers on qa.aid = answers.aid inner join users on answers.uid = users.uid where questions.qid = '+ qid +' and users.uid = '+ uid;
						    client.query(qstring00, function(err, result){
						    	if(result.rows[0] !== undefined){
						    		cb(err);
						    	}
						    	else{
								    var qstring = 'insert into answers values(($1),($2),($3),($4));';
									client.query(qstring,  [newAID, uid, 1, text], function(err, result) {
											done();
											//client.end();
											if (err) {
												cb(err);
											} else {
												var qstring2 = 'insert into qa values(($1),($2));';
												    client.query(qstring2, [qid, newAID], function(err, result) {
												    done();
												    //client.end();//put back?
											        if (err) {
														cb(err);
													} else {
														var qstringSumScore = 'select sum(score) from answers where uid = ' + uid;
														client.query(qstringSumScore, function(err, result){
															done();
															if(err){
																cb(err);
															}
															else{
																var qstringSetScore = 'update users set score = ' + result.rows[0].sum +' where uid = ' + uid;
																client.query(qstringSetScore, function(err, result){
																	done();
																	if(err){
																		cb(err);
																	}
																	else{
																		var qstring3 = 'update questions set repliestotal = repliestotal + 1 where qid = ' + qid + ';';
																	    client.query(qstring3, function(err, result) {
																	    done();
																	    //client.end();
																			if (err) {
																				cb(err);
																			} else {

																				var qstring4 = 'select * from questions where qid = ' + qid + ';';
																				    client.query(qstring4, function(err, result) {
																				    done();
																				    //client.end();
																						if (err) {
																							cb(err);
																						} else {

																							//"Was this the final answer?"
																							if (result.rows[0].repliestotal >= result.rows[0].replieslimit){

																								var qstring5 = 'update questions set status = 1 where qid = ' + qid + ';';
																								    client.query(qstring5, function(err, result) {
																								    done();
																								    client.end();
																										if (err) {
																											cb(err);
																										}
																										else{
																											cb(undefined, newAID);
																										}
																									});
																							}
																							//"No it wasn't, leave the question open and move on."
																							else{
																								cb(undefined, newAID);
																							}
																						}
																					});
																			}

																		});
																	}
																});
															}
														});
													}
												});
											}
									});
								}
							});
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
		} else {

			generateUID(function(error, newUID) {

				if (error){
					cb(error);
				} else{
				    var qstring = 'insert into users values(($1),($2),($3),($4),($5),($6));';
					client.query(qstring, [newUID, username, password, fname, lname, 0], function(err, result) {
							done();
							client.end();
							if (err) {
								cb(err);
							} else{
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
			var qstring = 'select * from questions where uid = ($1) order by qid desc';
			client.query(qstring, [uid], function(err, result){
				done();
				client.end();
				if(err){
					//console.log('error');
					cb(err);
				}
				else{
					//console.log('result');
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
			var qstring = 'select * from answers where uid = ($1) order by aid desc';
			client.query(qstring, [uid], function(err, result){
				done();
				client.end();
				if(err){
					//console.log('error');
					cb(err);
				}
				else{
					//console.log('result');
					cb(undefined, result);
				}
			});
		}
	});
}

/*
 */
function openQuestions(user, cb){
	pg.connect(cstr, function(err, client, done){
		if(err){
			cb(err);
		} else {
			var uid = user.uid;
			//var qstring = 'select * from questions where uid != ($1) and status = 0 order by qid desc';
			var qstring = 'SELECT * FROM Questions WHERE status = 0 AND uid <> ($1) AND qid NOT IN ( SELECT questions.qid FROM questions INNER JOIN qa ON questions.qid = qa.qid INNER JOIN answers ON answers.aid = qa.aid WHERE answers.uid = ($1)) ORDER BY qid DESC;';
			client.query(qstring, [uid], function(err, result){
				done();
				client.end();
				//console.log(result);
				if(err){
					//console.log('error');
					cb(err);
				} else {
					//console.log('result');
					cb(undefined, result);
				}
			});
		}
	});
}




function getQuestion(qid, cb){
	pg.connect(cstr, function(err, client, done){
		if(err){
			cb(err);
		} else {
			var qstring = 'select * from questions where qid = ($1)';
			client.query(qstring, [qid], function(err, result){
				done();
				client.end();
				//console.log(result);
				if(err){
					//console.log('error');
					cb(err);
				} else {
					//console.log('result');
					cb(undefined, result);
				}
			});
		}
	});
}


function getReplies(qid, uid, cb){
	pg.connect(cstr, function(err, client, done){
		if(err){
			cb(err);
		}
		else{
			var qstring = 'select answers.score, answers.aid, answers.reply, questions.repliestotal, questions.replieslimit, questions.title, questions.bodytext, questions.qid from questions inner join qa on questions.qid = qa.qid inner join answers on answers.aid = qa.aid inner join users on users.uid = answers.uid where questions.qid = ' + qid + ' and questions.uid = ' + uid;
			client.query(qstring, function(err, result){
				done();
				client.end();
				if(err){
					//console.log('error');
					cb(err);
				}
				else{
					if(result.rows[0] === undefined){
						cb('Not your question');
					}
					else{
						cb(undefined, result);
					}
				}
			});
		}
	});
}

function upvote(aid, uid, cb){
	pg.connect(cstr, function(err, client, done){
		if (err){
			cb(err);
		}
		else{
			var qstring = 'select * from qa where aid = ' + aid;
			client.query(qstring, function(err, result){
				done();
				if (err){
					cb(err);
				}
				else{

					if(result.rows[0] === undefined){
						cb(err);
					}

					var qid = result.rows[0].qid;

					var qstring2 = 'select * from questions where qid = ' + qid;
					client.query(qstring2, function(err, result){
						done();
						if (err){
							cb(err);
						}
						else{
							var quid = result.rows[0].uid;

							if (quid !== uid){
								cb(err);
							}
							else{
								var qstring3 = 'update answers set score = 2 where aid = ' + aid;
								client.query(qstring3, function(err, result){
									done();
									//client.end();
									if(err){
										cb(err);
									}
									else{
										var qstring4 = 'select uid from answers where aid = ' +aid;
										client.query(qstring4, function(err, result){
											done();
											if(err){
												cb(err);
											}
											else{
												var answerUID = result.rows[0].uid;
												var qstring5 = 'select sum(score) from answers where uid = ' + answerUID;
												client.query(qstring5, function(err, result){
													done();
													if(err){
														cb(err);
													}
													else{
														var qstring6 = 'update users set score = ' + result.rows[0].sum +' where uid = ' + answerUID;
														client.query(qstring6, function(err, result){
															done();
															client.end();
															if(err){
																cb(err);
															}
															else{
																//console.log(qid + "the index callback");
																cb(undefined, qid);
															}
														});
													}
												});
											}
										});
									}
								});
							}
						}
					});
				}
			});
		}

	});
}

function downvote(aid, uid, cb){
	pg.connect(cstr, function(err, client, done){
		if (err){
			cb(err);
		}
		else{
			var qstring = 'select * from qa where aid = ' + aid;
			client.query(qstring, function(err, result){
				done();
				if (err){
					cb(err);
				}
				else{

					if(result.rows[0] === undefined){
						cb(err);
					}

					var qid = result.rows[0].qid;

					var qstring2 = 'select * from questions where qid = ' + qid;
					client.query(qstring2, function(err, result){
						done();
						if (err){
							cb(err);
						}
						else{
							var quid = result.rows[0].uid;

							if (quid !== uid){
								cb(err);
							}
							else{
								var qstring3 = 'update answers set score = 0 where aid = ' + aid;
								client.query(qstring3, function(err, result){
									done();
									//client.end();
									if(err){
										cb(err);
									}
									else{
										var qstring4 = 'select uid from answers where aid = ' + aid;
										client.query(qstring4, function(err, result){
											done();
											if(err){
												cb(err);
											}
											else{
												var answerUID = result.rows[0].uid;
												var qstring5 = 'select sum(score) from answers where uid = ' + answerUID;
												client.query(qstring5, function(err, result){
													done();
													if(err){
														cb(err);
													}
													else{
														var qstring6 = 'update users set score = ' + result.rows[0].sum +' where uid = ' + answerUID;
														client.query(qstring6, function(err, result){
															done();
															client.end();
															if(err){
																cb(err);
															}
															else{
																//console.log(qid + "the index callback");
																cb(undefined, qid);
															}
														});
													}
												});
											}
										});
									}
								});
							}
						}
					});
				}
			});
		}

	});
}

/**
 * Export the functions
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
  userAns			: userAns,
  openQuestions		: openQuestions,
  getQuestion       : getQuestion,
  addAnswer         : addAnswer,
  getReplies		: getReplies,
  upvote			: upvote,
  downvote			: downvote
};
