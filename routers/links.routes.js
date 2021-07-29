const Router = require('express')
const auth = require('../middlewares/auth.middleware')
const LinksController = require('../controllers/LinksController')

const router = new Router()

router.get('/', auth, LinksController.getLinks)
router.get('/:id', LinksController.linkDetail)
router.post('/', auth, LinksController.create)

module.exports = router
