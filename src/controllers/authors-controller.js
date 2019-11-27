const Author = require('../models/author')
const { validate, authorSchema } = require('../utils/validations')

module.exports.create = async (req, res, next) => {
  const error = validate(req.body, authorSchema)
  if(error) return res.status(422).json({ error: error.message })
  if(req.currentUser._id != req.body.user) return res.status(403).json({ error: 'Unauthorised request' }) 
  try {
    const author = await Author.create({
      user: req.body.user,
      name: req.body.name
    })
    res.status(201).json({ author })
  } catch(err) {
    next(err)
  }
}

module.exports.delete = async (req, res, next) => {
  const userId = req.currentUser._id
  try {
    const author = await Author.findOneAndDelete({ _id: req.params.id, user: userId })
    if(!author) return res.status(404).json({ error: 'Author not found'})
    res.status(200).json({ author })
  } catch(err) {
    next(err)
  }
}

module.exports.getAll = async (req, res, next) => {
  const userId = req.currentUser._id
  try {
    const authors = await Author.find({ user: userId })
    res.status(200).json({ authors })
  } catch(err) {
    next(err)
  }
}

module.exports.getOne = async (req, res, next) => {
  const userId = req.currentUser._id
  try {
    const author = await Author.findOne({ _id: req.params.id, user: userId })
    if(!author) return res.status(404).json({ error: 'Author not found'})
    res.status(200).jso({ author })
  } catch(err) {
    next(err)
  }
}

module.exports.update = async (req, res, next) => {
  const error = validate(req.body, authorSchema)
  if(error) return res.status(422).json({ error: error.message })
  if(req.currentUser._id != req.body.user) return res.status(403).json({ error: 'Unauthorised request' }) 

  try {
    const author = await Author.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    if(!author) return res.status(404).json({ error: 'Author not found'})
    res.status(200).json({ author })
  } catch(err) {
    next(err)
  }
}