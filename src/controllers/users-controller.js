const User = require('../models/user')
const { validate, userSchema } = require('../utils/validations')

module.exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200).json({ users })
  } catch(err) {
    next(err)
  }
}

module.exports.getOne = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({ error: 'User not found'})
    res.status(200).json({ user })    
  } catch(err) {
    next(err)
  }
}

module.exports.create = async (req, res, next) => {
  const error = validate(req.body, userSchema)
  if(error) res.status(422).json({ error: error.message })
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      admin: req.body.admin
    })
    res.status(201).json({ email: user.email, admin: user.admin })
  } catch(err) {
    next(err)
  } 
}

module.exports.delete = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id })
    if(!user) return res.status(404).json({ error: "User not found" })
    return res.status(200).json({ user })
  } catch(err) {
    next(err)
  }
}

module.exports.update = async (req, res, next) => {
  const error = validate(req.body, userSchema)
  if(error) return res.status(422).json({ error: error.message })
  try { 
    const user = await User.findOneAndUpdate(
        { _id: req.params.id}, 
        req.body, 
        { runValidators: true, context: 'query', new: true }
    )
    if(!user) return res.status(404).json({ error: "User not found" })
    res.status(200).json( { user })
  } catch(err) {
    next(err)
  }
}