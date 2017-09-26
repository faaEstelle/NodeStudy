var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  username: 'String',
  pwd: 'String',
  IsAdmin: {
    type: Boolean,
    default: false
  }
})
module.exports = mongoose.model('User', schema)