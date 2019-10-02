const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
})

userSchema.pre('save', function(){
  console.log("Before save -> hash password")
})

module.exports = mongoose.model('User', userSchema)

