const { findAll } = require('../handler/mongoHandler')
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

module.exports = router
