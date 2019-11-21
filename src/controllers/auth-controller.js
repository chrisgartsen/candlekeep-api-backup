const User = require('../models/user')

module.exports.login = async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  if(!email || !password) return res.status(422).json({ error: 'Credentials are missing' })
  try {
    const user = await User.findOne({ email: email }).select("+password")
    if(!user) return res.status(401).json({ error: 'Authentication failed' })
    const valid = await user.checkCredentials(password)
    if(valid) {
      const token = await user.generateToken()
      res.status(200).header('x-auth-token', token).json({ token: token, id: user._id }) 
    } else {
      res.status(401).json({ error: 'Authentication failed' })
    }
  } catch(err) {
    console.log(err)
    next(err)
  }
}

module.exports.verifyToken = async (req, res, next) => {
  const token = req.header('x-auth-token')
  if(!token) return res.status(401).json({ error: 'Token missing' })
  try {
    const decoded = await User.verifyToken(token)
    const user = await User.findById(decoded.data)
    if(!user) return res.status(401).json({error: 'Authentication failed'})
    req.currentUser = user
    next()
  } catch(err) {
    console.log(err)
    res.status(401).json({error: 'Authentication failed'})
  }
}

module.exports.verifyCredentials = async (req, res, next) => {
  const token = req.header('x-auth-token')
  if(!token) return res.status(401).json({ error: 'Token missing' })
  try {
    const decoded = await User.verifyToken(token)
    const user = await User.findById(decoded.data)
    if(!user) return res.status(401).json({error: 'Authentication failed'})
    res.status(200).json({ message: 'Credentials valid' })
  } catch(err) {
    console.log(err)
    res.status(401).json({error: 'Authentication failed'})
  }
}

module.exports.verifyAdmin = (req, res, next) => {
  const user = req.currentUser
  if(!user || !user.admin) return res.status(403).json({ error: 'User not authorised' })
  next()
}