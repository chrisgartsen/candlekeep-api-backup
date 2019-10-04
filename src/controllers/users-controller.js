const User = require('../models/user')
const { validate, userSchema } = require('../utils/validations')

module.exports.getAll = (req, res, next) => {

}

module.exports.getOne = (req, res, next) => {

}

module.exports.create = (req, res, next) => {
  const error = validate(req.body, userSchema)
}

module.exports.delete = (req, res, next) => {

}

module.exports.update = (req, res, next) => {

}