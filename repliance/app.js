st login: Fri Apr  3 10:57:37 on ttys000
nedkov-lt03:repliance kalina$ cd ..
nedkov-lt03:team-rocket kalina$ cd ..
nedkov-lt03:326 kalina$ ls -l
total 120
drwxr-xr-x   7 kalina  staff    238 Feb 20 21:27 26166621
-rw-r--r--@  1 kalina  staff   5897 Feb  4 16:43 Vagrantfile
-rw-r--r--   1 kalina  staff   1430 Mar 29 12:41 app.js
-rw-r--r--   1 kalina  staff   1751 Feb 18 19:55 client.js
drwxr-xr-x@  4 kalina  staff    136 Feb  9 12:17 http-csv-starter
-rw-r--r--   1 kalina  staff    327 Mar 29 12:41 package.json
-rw-r--r--   1 kalina  staff    112 Feb 18 19:55 people.csv
drwxr-xr-x  12 kalina  staff    408 Mar 30 08:34 repliance
-rw-r--r--   1 kalina  staff   1434 Feb 18 19:55 server.js
drwxr-xr-x   9 kalina  staff    306 Apr  3 10:58 team-rocket
drwxr-xr-x   2 kalina  staff     68 Mar  8 14:30 test_replaince
drwxr-xr-x@ 12 kalina  staff    408 Mar 15 16:03 ws-express-and-databases-master
drwxrwxr-x   4 kalina  staff    136 Feb  7 20:36 ws01
drwxrwxr-x   4 kalina  staff    136 Feb  7 20:36 ws01 2
-rw-rw-r--   1 kalina  staff    680 Feb  7 15:37 ws01.zip
-rw-rw-r--   1 kalina  staff  26743 Feb 20 21:20 ws02.zip
nedkov-lt03:326 kalina$ cd repliance/
nedkov-lt03:repliance kalina$ ls -l 
total 24
-rw-r--r--   1 kalina  staff  1458 Mar 15 16:43 app.js
drwxr-xr-x   3 kalina  staff   102 Mar 15 15:59 bin
drwxr-xr-x@  3 kalina  staff   102 Mar 15 17:49 db
drwxr-xr-x  12 kalina  staff   408 Mar 15 16:11 node_modules
-rw-r--r--   1 kalina  staff   370 Mar 15 16:11 package.json
drwxr-xr-x   3 kalina  staff   102 Mar 15 15:59 public
-rw-r--r--   1 kalina  staff   192 Mar 15 16:03 repliance.komodoproject
drwxr-xr-x   4 kalina  staff   136 Mar 15 15:59 routes
drwxr-xr-x   5 kalina  staff   170 Mar 15 15:59 views
nedkov-lt03:repliance kalina$ vi app.js 

  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;


