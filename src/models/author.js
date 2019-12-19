const mongoose = require('mongoose')
const simpleSchema = require('./simpleSchema')

module.exports = mongoose.model('Author', simpleSchema)