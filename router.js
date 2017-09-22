var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  res.render('front/index', {title: '首页', layout: 'template'})
})

module.exports = router