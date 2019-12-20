const Genre = require('../models/genre')
const { validate, simpleSchema } = require('../utils/validations')

module.exports.create = async (req, res, next) => {
  const error = validate(req.body, simpleSchema)
  if(error) return res.status(422).json({ error: error.message })
  if(req.currentUser._id != req.body.user) return res.status(403).json({ error: "Unauthorised reques"})
  try {
    const genre = await Genre.create({
      user: req.body.user,
      name: req.body.name
    })
    res.status(201).json({ genre })
  } catch(err) {
    nex(err)
  }
}

module.exports.delete = async (req, res, next) => {
  const userId = req.currentUser._id
  try {
    const genre = await Genre.findOneAndDelete({ _id: req.params.id, user: userId})
    if(!genre) return res.status(404).json({ error: 'Genre not found' })
    res.status(200).json({ genre })
  } catch(err) {
    next(err)
  }
}

module.exports.getAll = async (req, res, next) => {
  const userId = req.currentUser._id
  try {
    const genres = await Genre.find({ user: userId })
    res.status(200).json({ genres })
  } catch(err) {
    next(err)
  }
}

module.exports.getOne = async (req, res, next) => {
  const userId = req.currentUser._id
  try {
    const genre = await Genre.findOne({ _id: req.params.id, user: userId })
    res.status(200),json({ genre })
  } catch(err) {
    next(err)
  }
}

module.exports.update = async (req, res, next) => {
  const error = validate(req.body, simpleSchema)
  const user = req.currentUser._id
  if(error) return res.status(422).json({ error: error.message })
  if(user != req.body.user) return res.status(403).json({ error: 'Unauthorised request' }) 
  try {
    const genre = await Genre.findOneAndUpdate({
      _id: req.params.id, 
      user: user
    },
    req.body,
    {
      new: true
    })
    if(!genre) return res.status(404).json({ error: 'Genre not found'})
    res.status(200).json({ genre })
  } catch(err) {
    next(err)
  }
}