const router = require('express').Router()
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { loginValidation } = require('../middleware/validation')
const { findOneById, findOne } = require('../handler/mongoHandler')
const auth = require('../middleware/auth')

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
    console.err(err.message)
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
      .json({ msg: 'validation error', errors: errors.array() })

  let { dbo } = req.app.locals
  let { email, password } = req.body
  try {
    let user = await findOne(dbo, 'users', { email })

    if (!user)
      return res.status(401).json({ msg: 'this email is not registered' })

    if (!user.isVerified)
      return res.status(402).json({ msg: 'email not verified' })

    let isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ msg: 'incorrect password' })

    let payload = {
      user: {
        id: user._id,
        name: user.name,
      },
    }

    let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 })
    res.json({ token })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server Error' })
  }
})

module.exports = router
