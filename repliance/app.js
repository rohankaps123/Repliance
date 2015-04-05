<<<<<<< HEAD
var express		= require('express');
=======
<<<<<<< HEAD
// Require the express library:
var express = require('express');
// Create an app:
var app = express();
// Static file serving:
app.use(express.static(__dirname + '/public'));
// Start the server:
var server = app.listen(3000, function () {
console.log('Listening on port %d', server.address().port);
});
=======
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
>>>>>>> 20e76cc3d5a700a676ea12e7cc1b90ac5d41d168

// Requiring session library:
var session		= require('express-session');

// Requiring flash library:
var flash		= require('connect-flash');

// These are the regular express built-in middleware:
var path		= require('path');
var favicon		= require('serve-favicon');
var logger		= require('morgan');
var cookieParser	= require('cookie-parser');
var bodyParser		= require('body-parser');

// Our user-defined routes/middleware:
var users		= require('./routes/users');

// Create the express application:
var app			= express();

// Setup the view engine:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Add favicon support:
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Added session support
app.use(session({ secret : 'octocat',
                  saveUninitialized : true,
                  resave : true }));
// Added flash support:
app.use(flash());

// Using our routes/middleware:
app.use('/user', users);

app.get('/', function (req, res) {
  res.redirect('/user/login');
});


///////////////////
// EVERYTHING BELOW HELPS WITH MISSING ROUTES
///////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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

// Export the app as the module:
module.exports = app;
>>>>>>> ad915665049b4b9e4db77a06a3bf375b0be46876
