const router = require('express').Router()
const { ObjectID } = require('mongodb')

const {
  findAll,
  insertOne,
  updateOne,
  deleteOne,
} = require('../handler/mongoHandler')
const auth = require('../middleware/auth')

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
