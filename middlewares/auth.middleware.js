const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] // 'Bearer TOKEN'

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedToken

    next()
  } catch (e) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
