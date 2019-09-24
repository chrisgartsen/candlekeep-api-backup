const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection
  .once('open', () => console.log("Connected to Mongo DB"))
  .on('error', (err) => console.log(err))