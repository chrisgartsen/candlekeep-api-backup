const Publisher = require('../models/publisher')
const { validate, simpleSchema } = require('../utils/validations')

module.exports.getOne = async (req, res, next) => {
  try {
    const publisher = Publisher.findOne({ _id: req.params.id, user: req.currentUser._id })
    if(!publisher) return res.status(404).json({ error: 'Publisher not found' })
    res.status(200).json({ publisher })
  } catch(err) {
    next(err)
  }
}

module.exports.getAll = async (req, res, next) => {
  try {
    const publishers = await Publisher.find({ user: req.currentUser._id })
    res.status(200).json({ publishers })
  } catch(err) {
    next(err)
  }
}

module.exports.create = async (req, res, next) => {
  const error = validate(req.body, simpleSchema)
  if(error) return res.status(422).json({ error: error.message })
  if(req.currentUser._id != req.body.user) return res.status(403).json({ error: 'Unauthorised request' })
  try {
    const publisher = await Publisher.create({
      user: req.body.user,
      name: req.body.name
    })
    res.status(201).json({ publisher })
  } catch(err) {
    next(err)
  }
}

module.exports.delete = async (req, res, next) => {
  try {
    const publisher = await Publisher.findOneAndDelete({ _id: req.params.id, user: req.currentUser._id })
    if(!publisher) return res.status(404).json({ error: 'Publisher not found' })
    res.status(200).json({ publisher })
  } catch(err) {
    next(err)
  }
}

module.exports.update = async (req, res, next) => {
  if(req.currentUser._id != req.body.user) return res.status(403).json({ error: 'Unauthorised request' }) 
  const error = validate(req.body, simpleSchema)
  if(error) return res.status(422).json({ error: error.message })
    try {
    const publisher = await Publisher.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    if(!publisher) return res.status(404).json({ error: 'Publisher not found'})
    res.status(200).json({ publisher })
  } catch(err) {
    next(err)
  }
}