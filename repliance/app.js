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