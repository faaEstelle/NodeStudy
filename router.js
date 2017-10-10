var express = require('express')
var router = express.Router()

var User = require('./src/controller/User')
var Admin = require('./src/controller/Admin')
var Work = require('./src/controller/Work')

var multer = require('multer')//文件上传下载组件

// var upload = multer({dest:'uploads/'});

var storage = multer.diskStorage({
  //设置文件存储位置，若未设置，则默认存储在系统的临时文件夹中
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  //设置上传文件的文件名及扩展名，若未设置，则以一串随机的字符串命名，无后缀
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
router.get('/admin/work/:id/edit', Work.EditWorkView)
router.post('/admin/work/:id/edit', upload.single('fileImg'), Work.EditWork)
router.get('/admin/work/del', Work.delWork)

module.exports = router