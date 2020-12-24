const router = require('express').Router()
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const path = require('path')

const { registerValidation } = require('../middleware/validation')
const {
  findOne,
  insertOne,
  findOneById,
  verifyUser,
} = require('../handler/mongoHandler')
const { sendVerificationMail } = require('../handler/mailerHandler')
const prod = process.env.NODE_ENV === 'production'

// *public
// POST /api/users
// register a user
router.post('/', registerValidation, async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ msg: 'validation error', errors: errors.array() })

  let { dbo, transporter } = req.app.locals
  let { name, email, city, phno, password } = req.body
  try {
    let user = await findOne(dbo, 'users', { email })

    if (user)
      return res
        .status(401)
        .json({ msg: 'Already regsitered, proceed to login' })

    let hash = await bcrypt.hash(password, 10)
    const result = await insertOne(dbo, 'users', {
      name,
      email,
      phno,
      city,
      password: hash,
      isVerified: 0,
      role: 'user',
      createdAt: new Date().toString().substring(4, 24),
    })

    let devLink = `${req.protocol}://${req.hostname}:5000/verify/${result.insertedId}`
    let prodLink = `${req.protocol}://${req.hostname}/verify/${result.insertedId}`
    let link = prod ? prodLink : devLink
    const mailResult = await sendVerificationMail(
      transporter,
      process.env.EMAIL,
      email,
      link
    )
    console.log(mailResult.envelope)
    res.json({ msg: 'verification email sent' })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server error' })
  }
})

// *public
// GET /api/users/verify/:userid
// verify user
router.get('/verify/:userid', async (req, res) => {
  let { dbo } = req.app.locals
  let { userid } = req.params
  try {
    let user = await findOneById(dbo, 'users', userid)

    if (!user) return res.sendFile(path.resolve(__dirname, '../views/404.html'))

    await verifyUser(dbo, userid)
    res.sendFile(path.resolve(__dirname, '../views/verificationPage.html'))
  } catch (err) {
    console.error(err.message)
    res.sendFile(path.resolve(__dirname, '../views/404.html'))
  }
})

module.exports = router
