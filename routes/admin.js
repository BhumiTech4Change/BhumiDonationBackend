const router = require('express').Router()
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { ObjectID } = require('mongodb')

const { loginValidation } = require('../middleware/validation')
const {
  findOneById,
  findOne,
  findAll,
  insertOne,
  updateOne,
  deleteOne,
} = require('../handler/mongoHandler')
const auth = require('../middleware/auth')

// !private
// GET /api/admin
// get logged in user
router.get('/', auth, async (req, res) => {
  let { dbo } = req.app.locals

  try {
    let user = await findOneById(dbo, 'admins', req.user.id)

    if (!user) return res.status(404).json({ msg: 'no user found' })
    res.json({ user })
  } catch (err) {
    console.err(err.message)
    res.status(500).json({ msg: 'Server Error' })
  }
})

// *public
// POST /api/admin/
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
    let user = await findOne(dbo, 'admins', { email })

    if (!user) return res.status(401).json({ msg: `Incorrect credentials.` })

    let isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ msg: 'Incorrect credentials.' })

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

// !private
// GET /api/admin/fundraisers
// get all fundraisers
router.get('/fundraisers', auth, async (req, res) => {
  const { dbo } = req.app.locals

  try {
    let fundraisers = await findAll(dbo, 'fundraisers')

    res.json({ fundraisers })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server errror' })
  }
})

// !private
// GET /api/admin/categories
// get all categories
router.get('/categories', auth, async (req, res) => {
  const { dbo } = req.app.locals

  try {
    let categories = await findAll(dbo, 'categories')

    res.json({ categories })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server errror' })
  }
})

// !private
// POST /api/admin/categories
// add new category
router.post('/categories', auth, async (req, res) => {
  const { dbo } = req.app.locals
  const { name } = req.body
  if (!name)
    return res.status(400).json({ msg: 'Please enter a category name' })
  try {
    let data = {
      name,
      createdAt: new Date().toString().substring(4, 24),
    }
    await insertOne(dbo, 'categories', data)
    res.json({ msg: 'Category added' })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server errror' })
  }
})

// !private
// PUT /api/admin/categories/:id
// update a category
router.put('/categories/:id', auth, async (req, res) => {
  const { dbo } = req.app.locals
  const { name } = req.body
  if (!name)
    return res.status(400).json({ msg: 'Please enter a category name' })

  try {
    let filter = { _id: new ObjectID(req.params.id) }
    let operation = { $set: { name } }
    await updateOne(dbo, 'categories', filter, operation)

    res.json({ msg: 'Category updated' })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server errror' })
  }
})

// !private
// DELETE /api/admin/categories/:id
// update a category
router.delete('/categories/:id', auth, async (req, res) => {
  const { dbo } = req.app.locals

  try {
    let filter = { _id: new ObjectID(req.params.id) }
    await deleteOne(dbo, 'categories', filter)

    res.json({ msg: 'Category deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server errror' })
  }
})

module.exports = router
