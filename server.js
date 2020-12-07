const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')
const nodemailer = require('nodemailer')
const cors = require('cors')
require('dotenv').config()

//To parse req.body
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//To enable cors
app.use(cors())

app.use('/api/users', require('./routes/users'))
app.use('/api/fundraisers', require('./routes/fundraisers'))
app.use('/api/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      clientId: process.env.MAIL_CLIENT_ID,
      clientSecret: process.env.MAIL_CLIENT_SECRET,
      refreshToken: process.env.MAIL_REFRESH_TOKEN,
      accessToken: process.env.MAIL_ACCESS_TOKEN,
      expires: 1484314697598,
    },
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
