const { ObjectID } = require('mongodb')
const { findAll, findOne } = require('../handler/mongoHandler')
const auth = require('../middleware/auth')

const router = require('express').Router()

// !private
// GET /api/ngos
// get list of ngos
router.get('/', auth, async (req, res) => {
  let { dbo } = req.app.locals
  try {
    let ngos = await findAll(dbo, 'ngos')
    res.json({ ngos })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server Error!' })
  }
})

// !private
// GET /api/ngos/:ngoid
// get ngo by id
router.get('/:ngoid', auth, async (req, res) => {
  let { dbo } = req.app.locals
  try {
    let ngo = await findOne(dbo, 'ngos', {
      _id: new ObjectID(req.params.ngoid),
    })
    res.json({ ngo })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server Error!' })
  }
})

module.exports = router
