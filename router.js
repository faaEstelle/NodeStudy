var express = require('express')
var router = express.Router()

var User = require('./src/controller/User')
var Admin = require('./src/controller/Admin')
var Work = require('./src/controller/Work')

var multer = require('multer')//文件上传下载组件

// var upload = multer({dest:'uploads/'});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    var fileformat = (file.originalname).split('.')
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileformat[fileformat.length - 1])
  }
})
var upload = multer({storage: storage})
// var storage = multer.memoryStorage();
// var upload = multer({storage:storage});

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
router.get('/admin/category/:id/edit', Admin.EditCategoryView)
router.post('/admin/category/:id/edit', Admin.EditCategory)
router.get('/admin/category/del', Admin.DelCategory)
router.get('/admin/work', Work.worksShow)
router.get('/admin/work/add', Work.AddWorkView)
router.post('/admin/work/add', upload.single('fileImg'), Work.AddWork)

module.exports = router