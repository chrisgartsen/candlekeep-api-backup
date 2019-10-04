const Joi = require('@hapi/joi');

module.exports.bookSchema = Joi.object({
  title: Joi.string().required()
})

module.exports.userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  admin: Joi.boolean()
})

module.exports.validate = (data, schema) => {
  const error = schema.validate(data).error
  if(error) error.message = error.details[0].message
  return error
}
