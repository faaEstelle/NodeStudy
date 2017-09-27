var express = require('express')
var router = express.Router()

var User = require('./src/controller/User')
var Admin = require('./src/controller/Admin')

router.get('/', function (req, res, next) {
  res.render('front/index', {title: '首页', layout: 'template', userInfo: req.userInfo})
})

router.post('/user/register', User.Register)
router.post('/user/login', User.Login)
router.get('/user/logOut', User.LogOut)

router.get('/admin', Admin.EnterManager)
router.get('/admin/userManager', Admin.UserManager)
router.get('/admin/category', Admin.Category)
router.get('/admin/category/add', Admin.AddCategoryView)
router.post('/admin/category/add', Admin.AddCategory)

module.exports = router