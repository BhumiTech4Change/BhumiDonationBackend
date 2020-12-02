const router = require('express').Router()
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const { registerValidation } = require('../middleware/validation')
const { findOneByEmail, insertOne } = require('../handler/mongoHandler')
const { sendVerificationMail } = require('../handler/mailerHandler')

//post /api/users
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
    let user = await findOneByEmail(dbo, 'users', email)

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
      time: new Date().toString().substring(4, 24),
    })

    let testLink = `${req.protocol}://${req.hostname}:5000/api/users/verify/${result.insertedId}`
    // let link = `${req.protocol}://${req.hostname}/api/users/verify/${result.insertedId}`
    const mailResult = await sendVerificationMail(
      transporter,
      process.env.EMAIL,
      email,
      testLink
    )
    console.log(mailResult.envelope)
    res.json({ msg: 'verification email sent' })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server error' })
  }
})

// get /api/users/verify/:userid
router.get('/verify/:userid', (req, res) => {})

module.exports = router
