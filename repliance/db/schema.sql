create table users (

uid int,
username varchar(20),
password varchar(50) NOT NULL,
fname varchar(50),
lname varchar(50),
score int,
primary key (uid)

);

create table answers(

aid int,
uid int references users(uid),
score int,
reply text,

primary key (aid)

);

create table questions(

qid int,
uid int references users(uid),
repliesTotal int,
repliesLimit int,
timeTotal int,
timeLimit int,
image bytea,
bodytext text,
title text,
status int,

primary key (qid)

);

create table qa(

qid int references questions(qid),
aid int references answers(aid),

primary key (qid, aid)

);