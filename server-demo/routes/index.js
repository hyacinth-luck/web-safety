var express = require('express');
var router = express.Router();
const xss = require('xss')
let userInput = '';


/* GET home page. */
router.get('', function(req, res, next) {
  res.render('xss', { title: 'xss' });
});
router.get('/badUrl', function(req, res, next) {
  // console.log('req:',req)
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
  res.write('<script>alert("反射型 XSS 攻击---恶意链接" )</script>');
  res.end();
});

router.post('/save', function(req, res, next) {
  // console.log('req:',req)
  userInput = req.body
  res.send({data:'success'});
});
router.get('/getCommit', function(req, res, next) {
  res.send({data:userInput}); // 未进行xss防御
  // res.send({data:xss(userInput)}); // 进行xss防御
});

router.post('/login', function(req, res, next) {
  console.log('login-req:',req)
  if(req.body){
    res.setHeader('Set-Cookie', [`userName=${req.body.userName}`, 'test=3333; expires=Sat, 21 Jul 2040 00:00:00 GMT;']);
  }
  res.cookie('userName',req.body.userName,{
    httpOnly:true,
    domain:'.xueersi.com'
  })
  res.send({data: '登录成功'}); 
});

module.exports = router;
