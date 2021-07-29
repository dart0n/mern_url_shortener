require('dotenv').config()
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

class AuthController {
  async signup(req, res) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: 'Invalid data for registration',
          errors: errors.array(),
        })
      }

      const { email, password } = req.body

      const existingUser = await User.findOne({ email })

      if (existingUser) {
        return res.status(409).json({ message: 'This user already exists' })
      }

      const hashedPassword = await bcrypt.hash(password, 12) // 12 - salt for hash
      const user = new User({ email, password: hashedPassword })

      await user.save()

      res.status(201).json({ message: 'The user created successfully' })
    } catch (e) {
      console.log(e)
      res.status(422).json({ message: 'Something went wrong, try again' })
    }
  }

  async signin(req, res) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: 'Invalid data',
          errors: errors.array(),
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(404).json({ message: 'The user not found' })
      }

      const isPasswordMatching = await bcrypt.compare(password, user.password)
      if (!isPasswordMatching) {
        return res.status(401).json({ message: 'Invalid password' })
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })

      res.json({ token, userId: user.id })
    } catch (e) {
      console.log(e)
      res.status(401).json({ message: 'Something went wrong, try again' })
    }
  }
}

module.exports = new AuthController()
