var express = require('express');
var router = express.Router();
const xss = require('xss')
let userInput = '';


/* GET home page. */
router.get('', function(req, res, next) {
  res.render('xss', { title: 'xss' });
});
router.get('/badUrl', function(req, res, next) {
  console.log('req:',req)
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
  res.write('<script>alert("反射型 XSS 攻击---恶意链接" )</script>');
  res.end();
});

router.post('/save', function(req, res, next) {
  console.log('req:',req)
  userInput = req.body
  res.send({data:'success'});
});
router.get('/getCommit', function(req, res, next) {
  res.send({data:userInput}); // 未进行xss防御
  // res.send({data:xss(userInput)}); // 进行xss防御
});

module.exports = router;
