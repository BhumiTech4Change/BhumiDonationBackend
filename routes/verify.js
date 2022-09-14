import express from 'express'
import path from 'path'


import { findOneById, verifyUser } from '../handler/mongoHandler.js'
import { sendVerificationConfirmationMail } from '../handler/mailerHandler.js'

const router = express.Router()

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

    let { transporter } = req.app.locals
    const mailResult = await sendVerificationConfirmationMail(
        transporter,
        user.name,
        process.env.EMAIL,
        user.email
    )
    console.log(mailResult.envelope)

    res.sendFile(path.resolve(__dirname, '../views/verificationPage.html'))
  } catch (err) {
    console.error(err.message)
    res.sendFile(path.resolve(__dirname, '../views/404.html'))
  }
})

export { router as verifyRoute }
