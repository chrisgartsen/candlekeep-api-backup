const Author = require('../models/author')
const { validate, authorSchema } = require('../utils/validations')

module.exports.create = async (req, res, next) => {

}

module.exports.delete = async (req, res, next) => {

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
  
}