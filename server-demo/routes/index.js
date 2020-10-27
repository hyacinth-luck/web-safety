var express = require('express');
var router = express.Router();
let userInput = '';

/* GET home page. */
router.get('', function(req, res, next) {
  res.render('xss', { title: 'xss' });
});
router.get('/badUrl', function(req, res, next) {
  console.log('req:',req)
  // res.render('data', { title: 'xss-badUrl' });
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
  res.write('<script>alert("反射型 XSS 攻击---恶意链接" )</script>');
  res.end();
});

router.post('/save', function(req, res, next) {
  console.log('req:',req)
  userInput = req.body
  // res.render('data', { title: 'xss攻击' });
  res.send({data:'success'});
});
router.get('/getCommit', function(req, res, next) {
  // console.log('req:',req)
  // userInput = req.body
  // res.render('data', { title: 'xss攻击' });
  res.send({data:userInput});
});

module.exports = router;
