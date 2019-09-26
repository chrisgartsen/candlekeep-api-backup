const router = require('express').Router()
const Joi = require('@hapi/joi');
const Book = require('../models/book')

const bookSchema = Joi.object({
    title: Joi.string().required()
})

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if(!book) return res.status(404).json({ error: 'Book not found'})
    res.status(200).json({book: book})
  } catch(error) {
    res.status(500).json({ error: "Internal server error" })
  }
})

router.post('/', async (req, res) => {
  const validation = bookSchema.validate(req.body)
  if(validation.error) {
    return res.status(422).json({ error: validation.error.details[0].message })
  }

  const book = await Book.create({
    title: req.body.title
  })

  res.status(201).json({ book: book})
})

module.exports = router