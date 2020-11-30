const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')
require('dotenv').config()

//To parse req.body
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/users', require('./routes/users'))
app.use('/api/fundraisers', require('./routes/fundraisers'))
app.use('/api/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)

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
