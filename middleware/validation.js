const { body } = require('express-validator')

const loginValidation = [
  body('email')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('Please enter an email')
    .bail()
    .isEmail()
    .withMessage('enter valid email')
    .bail(),
  body('password')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('Please enter password')
    .bail()
    .matches(
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
    )
    .withMessage('Invalid password'),
]

module.exports = {
  loginValidation,
}
