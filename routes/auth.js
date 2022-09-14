import express from 'express'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ObjectID } from 'mongodb'
import { nanoid } from 'nanoid'

import { sendPasswordResetMail } from '../handler/mailerHandler.js';
import {
  loginValidation,
  changePasswordValidation,
  resetPasswordRequestValidation,
} from '../middleware/validation.js'

import { findOneById, findOne, updateOne } from '../handler/mongoHandler.js'
import auth from '../middleware/auth.js'

const router = express.Router()
const prod = process.env.NODE_ENV === 'production'

// !private
// GET /api/auth
// get logged in user
router.get('/', auth, async (req, res) => {
  let { dbo } = req.app.locals

  try {
    let user = await findOneById(dbo, 'users', req.user.id)

    if (!user) return res.status(404).json({ msg: 'no user found' })
    res.json({ user })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server Error' })
  }
})

// *public
// POST /api/auth
// authenticate user and give token(login)
router.post('/', loginValidation, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ msg: 'Validation error', errors: errors.array() })

  let { dbo } = req.app.locals
  let { email, password } = req.body
  try {
    let user = await findOne(dbo, 'users', { email })

    if (!user)
      return res.status(401).json({ msg: 'This email is not registered' })

    if (!user.isVerified)
      return res.status(402).json({ msg: 'Email not verified' })

    let isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ msg: 'Incorrect password' })

    let payload = {
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    }

    let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })

    if (user.role === 'admin') return res.status(201).json({ token })
    res.json({ token })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server Error' })
  }
})

// !private
// POST /api/auth/changepassword
// change password of logged in user
router.post(
  '/changepassword',
  auth,
  changePasswordValidation,
  async (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ msg: 'Validation error', errors: errors.array() })

    let { dbo } = req.app.locals

    let { currentPwd, newPwd } = req.body

    try {
      let user = await findOne(dbo, 'users', { _id: new ObjectID(req.user.id) })

      if (!user) return res.status(404).json({ msg: 'No user found' })

      let isMatch = await bcrypt.compare(currentPwd, user.password)
      if (!isMatch)
        return res.status(401).json({ msg: 'Incorrect current password' })

      let hash = await bcrypt.hash(newPwd, 10)
      await updateOne(
        dbo,
        'users',
        { _id: new ObjectID(req.user.id) },
        { $set: { password: hash } }
      )
      res.json({ msg: 'Password updated' })
    } catch (err) {
      console.error(err.message)
      res.status(500).json({ msg: 'Server Error' })
    }
  }
);

/*
* Endpoint that handles forgot password
* It takes the email, searches if the user exists
* If yes, then sends him a mail with the url appended to the secret key
*/
router.post('/forgotPassword', resetPasswordRequestValidation, async function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty())
    return res
        .status(400)
        .json({ msg: 'Validation error', errors: errors.array() })

  const token = nanoid()
  let { dbo } = req.app.locals

  try {
    const user = await findOne(dbo, 'users', { email: req.body.email })

    if (!user) {
      return res
          .status(400)
          .json({msg: 'This email is not registered'})
    }

    await updateOne(
      dbo,
      'users',
      { _id: user._id },
      {
        $set: {
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000
        }
      }
    )

    let { transporter } = req.app.locals

    let devLink = `${req.protocol}://${req.hostname}:5000/reset/${token}`
    let prodLink = `https://platforms.bhumi.ngo/reset/${token}`
    let link = prod ? prodLink : devLink

    const mailResult = await sendPasswordResetMail(transporter,
      user.name,
      process.env.EMAIL,
      user.email,
      link
    )
    console.log(mailResult.envelope)
    res.json({ msg: 'Password reset email sent' })

  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server error' })
  }
})

export default router
