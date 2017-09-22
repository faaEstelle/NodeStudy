var path = require('path')
var express = require('express')

var partials = require('express-partials')

var Router = require('./router')
var app = express()

//设置模板目录及模板文件类型
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')
app.use(partials())

//设置静态文件托管
app.use('/public', express.static(__dirname + '/public'))

app.use(Router)

app.listen(8081)
