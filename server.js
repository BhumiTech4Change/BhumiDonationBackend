import express from 'express'
import {MongoClient} from 'mongodb'
import nodemailer from 'nodemailer'
import cors from 'cors'
import path, {dirname} from 'path'
import aws from 'aws-sdk'
import './middleware/config.js'
import {fileURLToPath} from 'url';
// import routes
import {verifyRoute} from './routes/verify.js';
import {resetPasswordRoute} from './routes/resetPassword.js';
import {usersRoute} from './routes/users.js';
import {fundraisersRoute} from './routes/fundraisers.js';
import {ngosRoute} from './routes/ngos.js';
import {authRoute} from './routes/auth.js';
import {razorPayRoute} from './routes/razorpay.js';
import {adminRoute} from './routes/admin.js';

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

//To parse req.body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))
//To enable cors
app.use(cors())

//routers
app.use('/api/users', usersRoute)
app.use('/api/fundraisers', fundraisersRoute)
app.use('/api/ngos', ngosRoute)
app.use('/api/auth', authRoute)
app.use('/api/razorpay', razorPayRoute)
app.use('/api/admin', adminRoute)
app.use('/verify', verifyRoute)
app.use('/reset', resetPasswordRoute)

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
  app.locals.transporter = nodemailer.createTransport({
    SES: new aws.SES(),
  })

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
