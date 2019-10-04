const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  admin: {
    type: Boolean,
    default: false
  }
})

userSchema.plugin(uniqueValidator)

userSchema.pre('save', function(){
  console.log("Before save -> hash password")
})

module.exports = mongoose.model('User', userSchema)

