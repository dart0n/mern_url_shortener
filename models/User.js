const { model, Schema, Types } = require('mongoose')

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  links: [{ type: Types.ObjectId, ref: 'Link' }],
})

module.exports = model('User', User)
