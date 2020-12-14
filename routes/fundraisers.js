const router = require('express').Router()
const { validationResult, body } = require('express-validator')
const { nanoid } = require('nanoid')

const auth = require('../middleware/auth')
const {
  findAll,
  findMany,
  insertOne,
  findOneById,
  findOne,
} = require('../handler/mongoHandler')
const { fundraiserValidation } = require('../middleware/validation')

// !private
// GET /api/fundraisers/
// get fundraisers of logged in user
router.get('/', auth, async (req, res) => {
  let { dbo } = req.app.locals
  try {
    let fundraisers = await findMany(dbo, 'fundraisers', {
      creatorId: req.user.id,
    })
    res.json({ fundraisers })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server Error!' })
  }
})

// !private
// POST /api/fundraisers/
// create new fundraiser
router.post('/', auth, fundraiserValidation, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ msg: 'validation error', errors: errors.array() })

  let { dbo } = req.app.locals
  let { ngo, description, subCategory } = req.body
  let shortUrl = nanoid(6)
  try {
    let data = {
      ngo,
      description,
      subCategory,
      shortUrl,
      creatorId: req.user.id,
      creatorName: req.user.name,
      amountRaised: 0,
      donors: [],
      createdAt: new Date().toString().substring(4, 24),
    }
    await insertOne(dbo, 'fundraisers', data)
    let link = `${req.protocol}://${req.hostname}/fundraisers/${shortUrl}`
    res.json({ msg: 'fundraiser created successfully', link })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server Error!' })
  }
})

// *public
// GET /api/fundraisers/:shortUrl
// get specific fundraiser
router.get('/:shortUrl', async (req, res) => {
  let { dbo } = req.app.locals
  let { shortUrl } = req.params

  try {
    let fundraiser = await findOne(dbo, 'fundraisers', { shortUrl })

    if (!fundraiser)
      return res.status(404).json({ msg: 'fundraiser not found' })

    res.json({ fundraiser })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server Error' })
  }
})

// !private
// GET /api/fundraisers/categories
// get list of categories
router.get('/categories', auth, async (req, res) => {
  let { dbo } = req.app.locals
  try {
    let categories = await findAll(dbo, 'categories')
    res.json({ categories })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server Error!' })
  }
})

module.exports = router
