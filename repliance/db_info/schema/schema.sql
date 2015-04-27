create table users (

uid int,
username varchar(20) NOT NULL UNIQUE,
password varchar(50) NOT NULL,
fname varchar(50),
lname varchar(50),
score int,
primary key (uid),
constraint uk_username unique (username)
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

CREATE SEQUENCE seq_answers INCREMENT 1 START 100 CACHE 10;
CREATE SEQUENCE seq_questions INCREMENT 1 START 100 CACHE 10;
CREATE SEQUENCE seq_users INCREMENT 1 START 100 CACHE 10;

insert into users values(1,'test','99999','test','test',0);
insert into questions values(1,1,0,10,0,0,NULL,'this is body', 'this is title', 0);
