module.exports = {
  EnterManager (req, res, next) {
    if (!req.userInfo.IsAdmin) {
      res.send('对不起，您没有管理权限！')

      return
    } else {
      res.send('后台管理界面')
    }

  }
}