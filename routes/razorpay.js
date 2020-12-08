const router = require('express').Router()
const Razorpay = require('razorpay')
const { nanoid } = require('nanoid')

const prod = process.env.NODE_ENV === 'production'

var razorpay = new Razorpay({
  key_id: prod ? process.env.RAZORPAY_PROD_ID : process.env.RAZORPAY_TEST_ID,
  key_secret: prod
    ? process.env.RAZORPAY_PROD_SECRET
    : process.env.RAZORPAY_TEST_SECRET,
})

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

module.exports = router
