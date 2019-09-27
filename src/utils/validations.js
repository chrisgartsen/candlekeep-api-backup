const Joi = require('@hapi/joi');

const validateBook = (bookData) => {

  const bookSchema = Joi.object({
    title: Joi.string().required()
  })

  return bookSchema.validate(bookData).error
}

module.exports.validateBook = validateBook