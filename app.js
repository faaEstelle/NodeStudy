var path = require('path')
var express = require('express')

var partials = require('express-partials')

var Router = require('./router')

var mongoose = require('mongoose')

//用body-parser处理post提交的数据
var bodyParser = require('body-parser')

//用cookies记录用户登录状态
var cookies = require('cookies')

var User = require('./src/modal/Users')

var app = express()

//设置模板目录及模板文件类型
app.set('views', path.join(__dirname, './src/views'))
app.set('view engine', 'ejs')
app.use(partials())

//设置静态文件托管
app.use('/public', express.static(__dirname + '/public'))

//配置body-parser
app.use(bodyParser.urlencoded({extended: true}))

//设置cookies
app.use(function (req, res, next) {
  //定义cookie对象，将cookie的req, res传入
  req.cookies = new cookies(req, res)

  //解析登录用户的cookie信息
  req.userInfo = {}
  if (req.cookies.get('userInfo')) {
    try {
      req.userInfo = JSON.parse(req.cookies.get('userInfo'))
      //获取当前登录用户的类型
      User.findById(req.userInfo._id).then(function (userInfo) {
        req.userInfo.IsAdmin = userInfo.IsAdmin
        next()
      })
    } catch (e) {
      next()
    }
  } else {
    next()
  }

})

//路由
app.use(Router)

//连接数据库
mongoose.connect('mongodb://localhost:27017/expressDB', function (err) {
  if (err) {
    console.log('数据库连接错误')
  } else {
    console.log('数据库连接成功')
    //数据库连接成功启动应用
    app.listen(8081)
  }
})





