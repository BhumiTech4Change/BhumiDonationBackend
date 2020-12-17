const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')
const nodemailer = require('nodemailer')
const cors = require('cors')
const path = require('path')
const aws = require('aws-sdk')
require('dotenv').config()

//To parse req.body
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//To enable cors
app.use(cors())

//routers
app.use('/api/users', require('./routes/users'))
app.use('/api/fundraisers', require('./routes/fundraisers'))
app.use('/api/ngos', require('./routes/ngos'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/razorpay', require('./routes/razorpay'))
app.use('/api/admin', require('./routes/admin'))
app.use('/verify', require('./routes/verify'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('Content-Security-Policy', "frame-ancestors 'none'")
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)

  aws.config.update({
    accessKeyId: process.env.AWS_MAIL_KEY,
    secretAccessKey: process.env.AWS_MAIL_SECRET,
    region: 'us-east-1',
    maxRetries: 1,
  })
  let transporter = nodemailer.createTransport({
    SES: new aws.SES(),
  })

  app.locals.transporter = transporter

  MongoClient.connect(
    process.env.DB_URL,
    { useUnifiedTopology: true },
    (err, db) => {
      if (err) throw err

      app.locals.dbo = db.db('donationApp')
      console.log(`And db connected`)
    }
  )
})
