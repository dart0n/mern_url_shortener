const Router = require('express')
const { check } = require('express-validator')
const AuthController = require('../controllers/AuthController')

const router = new Router()

router.post(
  '/signup',
  [
    check('email', 'Некорректный email').normalizeEmail().isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({
      min: 6,
    }),
  ],
  AuthController.signup
)
router.post(
  '/signin',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  AuthController.signin
)

module.exports = router
