var path = require('path')
var express = require('express')

var partials = require('express-partials')

var Router = require('./router')

var mongoose = require('mongoose')

//用body-parser处理post提交的数据
var bodyParser = require('body-parser')

var app = express()

//设置模板目录及模板文件类型
app.set('views', path.join(__dirname, './src/views'))
app.set('view engine', 'ejs')
app.use(partials())

//设置静态文件托管
app.use('/public', express.static(__dirname + '/public'))

//配置body-parser
app.use(bodyParser.urlencoded({extended: true}))

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





