const router = require('express').Router()
const { ObjectID } = require('mongodb')

const {
  findAll,
  insertOne,
  updateOne,
  deleteOne,
  findMany,
} = require('../handler/mongoHandler')
const auth = require('../middleware/auth')
const adminCheck = require('../middleware/adminCheck')

// !private
// GET /api/admin/fundraisers
// get all fundraisers for a ngo
router.get('/fundraisers', auth, adminCheck, async (req, res) => {
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
// GET /api/admin/fundraisers/:ngoId
// get all fundraisers for a ngo
router.get('/fundraisers/:ngoId', auth, adminCheck, async (req, res) => {
  const { dbo } = req.app.locals

  try {
    let filter = { ngoId: req.params.ngoId }
    let fundraisers = await findMany(dbo, 'fundraisers', filter)

    res.json({ fundraisers })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server errror' })
  }
})

// !private
// POST /api/admin/ngos
// add new ngo
router.post('/ngos', auth, adminCheck, async (req, res) => {
  const { dbo } = req.app.locals
  const { name, description, url } = req.body

  try {
    let data = {
      name,
      description,
      url,
      subCategories: [],
      createdAt: new Date().toString().substring(4, 24),
    }
    await insertOne(dbo, 'ngos', data)
    res.json({ msg: 'NGO added' })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server errror' })
  }
})

// !private
// DELETE /api/admin/ngos/:id
// delete a ngo
router.delete('/ngos/:id', auth, adminCheck, async (req, res) => {
  const { dbo } = req.app.locals

  try {
    let filter = { _id: new ObjectID(req.params.id) }
    await deleteOne(dbo, 'ngos', filter)

    res.json({ msg: 'NGO deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server errror' })
  }
})

// !private
// POST /api/admin/ngos/:ngoId/categories
// add new category
router.post('/ngos/:ngoId/categories', auth, adminCheck, async (req, res) => {
  const { dbo } = req.app.locals
  const { name, description, url } = req.body

  try {
    let data = {
      name,
      description,
      url,
      createdAt: new Date().toString().substring(4, 24),
    }
    let filter = { _id: new ObjectID(req.params.ngoId) }
    let operation = { $push: { subCategories: data } }

    await updateOne(dbo, 'ngos', filter, operation)
    res.json({ msg: 'Category added' })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server errror' })
  }
})

// !private
// DELETE /api/admin/ngos/:ngoId/categories/
// add new category
router.delete(
  '/ngos/:ngoId/categories/',
  auth,
  adminCheck,
  async (req, res) => {
    const { dbo } = req.app.locals
    const { name } = req.body

    try {
      let filter = { _id: new ObjectID(req.params.ngoId) }
      let operation = { $pull: { subCategories: { name } } }

      await updateOne(dbo, 'ngos', filter, operation)
      res.json({ msg: 'Category removed' })
    } catch (err) {
      console.error(err.message)
      res.status(500).json({ msg: 'Server errror' })
    }
  }
)

module.exports = router
