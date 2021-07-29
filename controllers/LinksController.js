const shortid = require('shortid')
const Link = require('../models/Link')

class LinksController {
  async getLinks(req, res) {
    try {
      const links = await Link.find({ owner: req.user.userId })
      res.json(links)
    } catch (e) {
      res.status(404).json({ message: 'Something went wrong, try again' })
    }
  }

  async linkDetail(req, res) {
    try {
      const link = await Link.findById(req.params.id)
      res.json(link)
    } catch (e) {
      res.status(404).json({ message: 'Something went wrong, try again' })
    }
  }

  async create(req, res) {
    try {
      const { url } = req.body

      const linkExists = await Link.findOne({ url })
      if (linkExists) {
        return res.json({ link: linkExists })
      }

      const code = shortid.generate()
      const baseUrl = process.env.BASE_URL
      const shortUrl = baseUrl + '/t/' + code

      const link = new Link({ url, code, shortUrl, owner: req.user.userId })

      await link.save()

      res.status(201).json({ link })
    } catch (e) {
      console.log(e)
      res.status(422).json(e)
    }
  }
}

module.exports = new LinksController()
