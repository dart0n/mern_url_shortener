const { model, Schema, Types } = require('mongoose')

const Link = new Schema({
  url: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  shortUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  clicks: { type: Number, default: 0 },
  owner: { type: Types.ObjectId, ref: 'User' },
})

module.exports = model('Link', Link)
