var mongoose = require('mongoose')

var schema = new mongoose.Schema({username: 'String', pwd: 'String'})
module.exports = mongoose.model('User', schema)