const mongoose = require('mongoose')

const connectDB = () => {
  try {
    mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  } catch(error) {
    console.log(error)
  }
}

module.exports.connectDB = connectDB