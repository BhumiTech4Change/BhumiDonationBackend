const router = require('express').Router()
const Razorpay = require('razorpay')
const { nanoid } = require('nanoid')
const crypto = require('crypto')
const { updateOne } = require('../handler/mongoHandler')
const prod = process.env.NODE_ENV === 'production'

var razorpay = new Razorpay({
  key_id: prod ? process.env.RAZORPAY_ID : process.env.RAZORPAY_TEST_ID,
  key_secret: prod
    ? process.env.RAZORPAY_SECRET
    : process.env.RAZORPAY_TEST_SECRET,
})

// *public
// POST /api/razorpay/
// create new order
router.post('/', async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: 'INR',
    receipt: nanoid(),
    payment_capture: true,
  }
  try {
    const order = await razorpay.orders.create(options)
    res.json({ order })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error })
  }
})

// *public
// POST /api/razorpay/verify
// verify payment
router.post('/verify', async (req, res) => {
  const { dbo } = req.app.locals
  const secret = prod
    ? process.env.RAZORPAY_SECRET
    : process.env.RAZORPAY_TEST_SECRET
  let {
    order_id,
    razorpay_payment_id,
    razorpay_signature,
    donor,
    shortUrl,
  } = req.body
  const signature = crypto
    .createHmac('sha256', secret)
    .update(order_id + '|' + razorpay_payment_id)
    .digest('hex')

  const isValid = signature === razorpay_signature
  if (!isValid) res.status(400).json({ msg: 'Invalid signature' })

  donor = {
    ...donor,
    payment_id: razorpay_payment_id,
    donatedAt: new Date().toString().substring(4, 24),
  }

  let operation = {
    $push: {
      donors: donor,
    },
    $inc: { amountRaised: donor.amount },
  }

  try {
    await updateOne(dbo, 'fundraisers', { shortUrl }, operation)
    res.json({ msg: 'Donation saved in database.' })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
