const User = require('../models/user')

module.exports.login = async(req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  if(!email || !password) return res.status(422).json({ error: 'Credentials are missing' })
  try {
    const user = await User.findOne({ email: email }).select("+password")
    if(!user) return res.status(401).json({ error: 'Authentication failed' })
    const valid = await user.checkCredentials(password)
    if(valid) {
      const token = await user.generateToken()
      res.status(200).header('x-auth-token', token).json({ token }) 
    } else {
      res.status(401).json({ error: 'Authentication failed' })
    }
  } catch(err) {
    next(err)
  }

}