var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  name: 'String',
  code: 'String',
})
module.exports = mongoose.model('Category', schema)