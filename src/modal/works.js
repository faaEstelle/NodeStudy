var mongoose = require('mongoose')
var schema = new mongoose.Schema({
  title: 'String',
  author: 'String',
  kind: 'String',
  dataValue: 'String',
  introduce: 'String',
  createTime: 'String',

})
module.exports = mongoose.model('Work', schema)