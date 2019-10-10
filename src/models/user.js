const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')

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

userSchema.pre('save', async function(){
  try {
    this.password = await bcrypt.hash(this.password, 10)
  } catch(err) {
    console.log(err)
    throw(err)
  }

  console.log("Before save -> hash password")
})

module.exports = mongoose.model('User', userSchema)

