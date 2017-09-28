var User = require('../modal/Users')
var Cagetory = require('../modal/categories')
var mongoose = require('mongoose')
var IsEdit = false

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
    Cagetory.find().then(function (categories) {
      res.render('manage/category', {title: '分类管理', layout: 'template', categories: categories})
    })

  },
  AddCategoryView (req, res, next) {
    var category = new Cagetory()
    IsEdit = false
    res.render('manage/addCategory', {title: '添加分类', layout: 'template', category: category, IsEdit: IsEdit})
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
    Cagetory.findOne({name: name}).then(function (category) {
      if (category) {
        res.render('manage/error', {title: '添加分类', layout: 'template', errorInfo: '改分类已存在'})
        return Promise.reject()
      } else {
        var category = new Cagetory({
          name: name,
          code: code
        })
        return category.save()
      }
    }).then(function (newCategory) {
      if (newCategory) {
        console.log(newCategory)
        res.redirect('/admin/category')
      }
    })
  },
  EditCategoryView (req, res, next) {
    var id = req.query.id
    console.log(id)
    IsEdit = true
    Cagetory.findById(id).then(function (category) {
      console.log('修改的' + category)
      if (!category) {
        res.render('manage/error', {title: '修改分类', layout: 'template', errorInfo: '该分类不存在'})

      } else {
        res.render('manage/addCategory', {title: '修改分类', layout: 'template', category: category, IsEdit: IsEdit})
      }
    })
  },
  EditCategory (req, res, next) {
    var id = req.query.id
    console.log(id)
    var name = req.body.name
    Cagetory.findById(id).then(function (category) {
      console.log('1:' + category)
      if (!category) {
        res.render('manage/error', {title: '修改分类', errorInfo: '分类不存在'})
        return Promise.reject()
      } else {
        if (name = category.name) {
          res.render('manage/error', {title: '修改分类', errorInfo: '未做任何修改'})
          return Promise.reject()
        } else {
          return Cagetory.findOnd({
            _id: {$ne: id},
            name: name
          })
        }

      }
    }).then(function (hasCategory) {
      if (hasCategory) {
        res.render('manage/error', {title: '修改分类', errorInfo: '分类已存在'})
        return Promise.reject()
      } else {
        return Cagetory.update({
          _id: id,
        }, {
          name: name
        })
      }

    }).then(function () {
      res.redirect('/admin/category')
    })
  },
  DelCategory (req, res, next) {
    var id = req.query.id
    console.log(id)
    Cagetory.findById(id).then(function (category) {
      if (!category) {
        res.render('manage/error', {title: '删除分类', errorInfo: '分类不存在'})
      } else {
        category.remove().then(function (result) {
          if (result) {
            res.redirect('/admin/category')
          }
        })
      }
    })
  }

}