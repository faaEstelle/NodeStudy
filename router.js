var express = require('express')
var router = express.Router()

var User = require('./src/modal/Users')

router.get('/', function (req, res, next) {
  res.render('front/index', {title: '首页', layout: 'template'})
})

/**
 * 注册逻辑
 *  验证
 *      1 用户名不能为空；
 *      2 密码不能为空；
 *      2,用户名未经注册；
 */
//定义统一的返回格式
var responseData = {
  code: 0, //错误编码
  message: ''  //错误信息
}
// router.use(function (req,res,next) {
//   responseData = {
//     code: 0, //错误编码
//     message: ''  //错误信息
//   };
//   next();
// })
router.post('/user/register', function (req, res, next) {
  var username = req.body.username
  var pwd = req.body.pwd
  if (username === '') {
    responseData.code = 1
    responseData.message = '用户名不能为空'
    res.json(responseData)
    return
  }
  if (pwd === '') {
    responseData.code = 2
    responseData.message = '密码不能为空'
    res.jsonp(responseData)
    return
  }

  User.findOne({
    username: username
  }).then(function (userInfo) {
    if (userInfo) {
      responseData.code = 4
      responseData.message = '用户名已存在'
      res.json(responseData)
    }
    var user = new User({
      username: username,
      pwd: pwd
    })
    return user.save()
  }).then(function (newUserInfo) {
    console.log(newUserInfo)
    //注册成功
    responseData.message = '注册成功'
    res.json(responseData)
  })
})


module.exports = router