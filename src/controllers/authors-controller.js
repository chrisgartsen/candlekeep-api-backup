const Author = require('../models/author')
const { validate, authorSchema } = require('../utils/validations')

module.exports.create = async (req, res, next) => {
  const error = validate(req.body, authorSchema)
  if(error) return res.status(422).json({ error: error.message })
  try {
    const author = await Author.create({
      name: req.body.name
    })
    res.status(201).json({ author })
  } catch(err) {
    next(err)
  }
}

module.exports.delete = async (req, res, next) => {
  try {
    const author = await Author.findOneAndDelete({ _id: req.params.id })
    if(!author) return res.status(404).json({ error: 'Author not found'})
    res.status(200).json({ author })
  } catch(err) {
    next(err)
  }
}

module.exports.getAll = async (req, res, next) => {
  try {
    const authors = await Author.find()
    res.status(200).json({ authors })
  } catch(err) {
    next(err)
  }
}

module.exports.getOne = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id)
    if(!author) return res.status(404).json({ error: 'Author not found'})
    res.status(200).jso({ author })
  } catch(err) {
    next(err)
  }
}

module.exports.update = async (req, res, next) => {
  const error = validate(req.body, authorSchema)
  if(error) return res.status(422).json({ error: error.message })
  try {
    const author = await Author.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    if(!author) return res.status(404).json({ error: 'Author not found'})
    res.status(200).json({ author })
  } catch(err) {
    next(err)
  }
}