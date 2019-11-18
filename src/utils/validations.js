const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports.bookSchema = Joi.object({
  user: Joi.objectId().required(),
  isbn: Joi.string().allow('', null),
  title: Joi.string().required(),
  author: Joi.string().allow('', null),
  genre: Joi.string().allow('', null),
  publisher: Joi.string().allow('', null),
  publishedDate: Joi.string().allow('', null),
  language: Joi.string().allow('', null),
  description: Joi.string().allow('', null),
  thumbnail: Joi.string().allow('', null)
})

module.exports.userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  admin: Joi.boolean()
})

module.exports.authorSchema = Joi.object({
  name: Joi.string().required()
})

module.exports.validate = (data, schema) => {
  const error = schema.validate(data).error
  if(error) error.message = error.details[0].message
  return error
}
