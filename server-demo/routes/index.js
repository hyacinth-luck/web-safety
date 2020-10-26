var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dsy', function(req, res, next) {
  res.render('dsy', { title: 'dsy' });
});

module.exports = router;
