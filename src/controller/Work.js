var Work = require('../modal/works')
var User = require('../modal/Users')
var multer = require('multer')//文件上传下载组件
var formidable = require('formidable')//enctype="multipart/form-data"表单格式下的数据处理

var upload = multer({dest: 'uploads/'})

var IsEdit = false
module.exports = {
  worksShow (req, res, next) {
    var page = Number(req.query.page || 1)
    var limit = 2
    var skip = (page - 1) * limit
    var maxPage = 0
    Work.count().then(function (count) {
      //总页数
      maxPage = Math.ceil(count / limit)
      Work.find().limit(limit).skip(skip).then(function (works) {
        res.render('manage/works', {
          title: '作品管理',
          layout: 'template',
          works: works,
          page: page,
          maxPage: maxPage,
          count: count,
          limit: limit
        })
      })
    })
  },
  AddWorkView (req, res, next) {
    var work = new Work()
    res.render('manage/addWork', {title: '添加作品', layout: 'template', work: work, IsEdit: IsEdit})
  },
  AddWork (req, res, next) {
    var title = req.body.title
    var author = req.body.author
    var kind = req.body.kind
    var introduce = req.body.introduce
    var file = req.file
    Work.findOne({title: title, author: author, kind: kind}).then(function (work) {
      if (work) {
        res.render('manage/error', {title: '添加作品', layout: 'template', errorInfo: '该作品已存在'})
        return Promise.reject()
      } else {
        var work = new Work({
          title: title,
          author: author,
          kind: kind,
          dataValue: '../../../' + file.path,
          introduce: introduce,
          createTime: Date.now()
        })
        return work.save()
      }
    }).then(function (newWork) {
      if (newWork) {
        console.log(newWork)
        res.redirect('/admin/work')
      }
    })

  }
}