const { findOneById, verifyUser } = require('../handler/mongoHandler')
const path = require('path')
const router = require('express').Router()

// *public
// GET /verify/:userid
// verify user
router.get('/:userid', async (req, res) => {
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
