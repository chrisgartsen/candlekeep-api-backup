const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

userSchema.methods.generateToken = async function() {
  try {
    return await jwt.sign({ data: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  } catch(err) {
    throw(err)
  }
}

userSchema.methods.verifyToken = async function(token) {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET )
    console.log(decoded)
  } catch(err) {
    console.log(err)
  }
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

