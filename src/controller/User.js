var User = require('../modal/Users')
//定义统一的返回格式
var responseData = {
  code: 0, //错误编码
  message: ''  //错误信息
}
/**
 * 注册逻辑
 *  验证
 *      1 用户名不能为空；
 *      2 密码不能为空；
 *      2,用户名未经注册；
 */
module.exports = {
  Register (req, res, next) {
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
  },
  Login (req, res, next) {
    var username = req.body.username
    var pwd = req.body.pwd
    User.findOne({
      username: username,
      pwd: pwd
    }).then(function (userInfo) {
      if (!userInfo) {
        responseData.code = 1
        responseData.message = '用户或密码错误'
        res.json(responseData)
        return
      }
      responseData.message = '登录成功'
      responseData.userInfo = {
        _id: userInfo._id,
        username: username
      }
      //将用户登录信息以字符串的形式存入cookie
      req.cookies.set('userInfo', JSON.stringify({
        _id: responseData.userInfo._id,
        username: username
      }))
      res.json(responseData)
      return
    })
  },
  LogOut (req, res, next) {
    req.cookies.set('userInfo', null)
    res.json(responseData)
  }
}