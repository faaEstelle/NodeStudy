var User = require('../modal/Users')
var Cagetory = require('../modal/categories')

module.exports = {
  EnterManager (req, res, next) {
    if (!req.userInfo.IsAdmin) {
      res.send('对不起，您没有管理权限！')
      return
    } else {
      res.render('manage/index', {title: '后台管理', layout: 'template'})
    }

  },
  UserManager (req, res, next) {
    /**
     * 读取用户信息
     * limit()：限制显示的条数
     * skip()：忽略数据的条数
     * count()：获取总条数
     *
     */

    var page = Number(req.query.page || 1)
    var limit = 2
    var skip = (page - 1) * limit
    var maxPage = 0
    User.count().then(function (count) {
      //总页数
      maxPage = Math.ceil(count / limit)
      User.find().limit(limit).skip(skip).then(function (users) {
        res.render('manage/user', {
          title: '用户管理',
          layout: 'template',
          users: users,
          page: page,
          maxPage: maxPage,
          count: count,
          limit: limit
        })
      })
    })

  },
  Category (req, res, next) {
    res.render('manage/category', {title: '分类管理', layout: 'template'})
  },
  AddCategoryView (req, res, next) {
    res.render('manage/addCategory', {title: '添加分类', layout: 'template'})
  },
  AddCategory (req, res, next) {
    var name = req.body.name
    var code = req.body.code
    if (name === '') {
      res.render('manage/error', {title: '添加分类', layout: 'template', errorInfo: '分类名为必填项'})
      return
    }
    if (code === '') {
      res.render('manage/error', {title: '添加分类', layout: 'template', errorInfo: '分类代号为必填项'})
      return
    }
    Cagetory.findOne({code: code}).then(function (category) {
      if (category) {

      }
      var category = new Cagetory({
        name: name,
        code: code
      })
      return category.save()
    }).then(function (newCategory) {
      if (newCategory) {
        console.log(newCategory)
      }
    })
  }

}