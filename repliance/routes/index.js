var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

// Support for times route:
router.get('/times', function (req, res) {
  res.render('times', { title: 'Times' });
});

module.exports = router;
