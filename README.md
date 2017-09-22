一、设置引擎模板文件，模板类型，页面目录
  var partials = require('express-partials')
  app.set('views', path.join(__dirname, './views'))
  app.set('view engine', 'ejs')
  app.use(partials())
