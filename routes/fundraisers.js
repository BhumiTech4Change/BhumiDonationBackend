import express from 'express';
import { validationResult } from 'express-validator'
import { nanoid } from 'nanoid'

import auth from '../middleware/auth.js'
import {
  findMany,
  insertOne,
  findOne,
} from '../handler/mongoHandler.js'
import { fundraiserValidation } from '../middleware/validation.js'

const router = express.Router()

// !private
// GET /api/fundraisers/
// get fundraisers of logged in user
router.get('/', auth, async (req, res) => {
  let { dbo } = req.app.locals
  try {
    let fundraisers = await findMany(dbo, 'fundraisers', {
      creatorId: req.user.id,
    })
    res.json({ fundraisers })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server Error!' })
  }
})

// !private
// POST /api/fundraisers/
// create new fundraiser
router.post('/', auth, fundraiserValidation, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ msg: 'validation error', errors: errors.array() })

  let { dbo } = req.app.locals
  let { ngo, ngoId, description, subCategory, type } = req.body
  let shortUrl = nanoid(6)
  try {
    let data = {
      ngo,
      ngoId,
      description,
      subCategory,
      type,
      shortUrl,
      creatorId: req.user.id,
      creatorName: req.user.name,
      amountRaised: 0,
      donors: [],
      createdAt: new Date().toString().substring(4, 24),
    }
    await insertOne(dbo, 'fundraisers', data)
    res.json({ msg: 'fundraiser created successfully', shortUrl })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server Error!' })
  }
})

// *public
// GET /api/fundraisers/:shortUrl
// get specific fundraiser
router.get('/:shortUrl', async (req, res) => {
  let { dbo } = req.app.locals
  let { shortUrl } = req.params

  try {
    let fundraiser = await findOne(dbo, 'fundraisers', { shortUrl })

    if (!fundraiser)
      return res.status(404).json({ msg: 'fundraiser not found' })

    res.json({ fundraiser })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server Error' })
  }
})

export { router as fundraisersRoute }
