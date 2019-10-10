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

userSchema.methods.checkCredentials = async function(password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.pre('save', async function(){
  try {
    this.password = await bcrypt.hash(this.password, 10)
  } catch(err) {
    console.log(err)
    throw(err)
  }
})

module.exports = mongoose.model('User', userSchema)

