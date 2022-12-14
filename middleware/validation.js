import { body } from 'express-validator'

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

const resetPasswordRequestValidation = [
  body('email')
      .exists({ checkFalsy: true, checkNull: true })
      .withMessage('Please enter an email')
      .bail()
      .isEmail()
      .withMessage('enter valid email')
      .bail()
]

const registerValidation = [
  body('name')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('Please enter a name')
    .bail(),
  body('email')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('Please enter an email')
    .bail()
    .isEmail()
    .withMessage('enter valid email')
    .bail(),
  body('city')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('Please enter a city')
    .bail(),
  body('phno')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('Please enter a mobile number')
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

const fundraiserValidation = [
  body('ngo')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('Please enter a ngo name')
    .bail(),
  body('ngoId')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('Please provide an ngo ID')
    .bail(),
  body('description')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('Please enter a description')
    .bail(),
  body('subCategory')
    .exists({ checkNull: true })
    .withMessage('Please choose a category')
    .bail(),
  body('type')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('Please choose a category')
    .bail(),
]

const changePasswordValidation = [
  body('currentPwd')
    .exists()
    .withMessage('Please enter current password')
    .bail(),
  body('newPwd')
    .exists()
    .withMessage('Please enter new password')
    .bail()
    .custom((value, { req }) => value !== req.body.currentPwd)
    .withMessage('New password cannot be the same as old password')
    .bail()
    .matches(
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
    )
    .withMessage('Invalid new password'),
]

export {
  loginValidation,
  registerValidation,
  fundraiserValidation,
  changePasswordValidation,
  resetPasswordRequestValidation
}
