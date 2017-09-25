var express = require('express')
var router = express.Router()

var User = require('./src/controller/User')

router.get('/', function (req, res, next) {
  res.render('front/index', {title: '首页', layout: 'template', userInfo: req.userInfo})
})
router.post('/user/register', User.Register)
router.post('/user/login', User.Login)

module.exports = router