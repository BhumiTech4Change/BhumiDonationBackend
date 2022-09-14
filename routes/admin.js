import express from 'express';
import { ObjectID } from 'mongodb'
import multer from 'multer'
import { nanoid } from 'nanoid'
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) =>
    cb(
      null,
      Date.now() +
        '.' +
        file.mimetype.substring(file.mimetype.lastIndexOf('/') + 1)
    )
})
const upload = multer({ storage })
import {
  findAll,
  insertOne,
  updateOne,
  deleteOne,
  findMany
} from '../handler/mongoHandler.js'
import auth from '../middleware/auth.js'
import adminCheck from '../middleware/adminCheck.js'

const router = express.Router()

// !private
// GET /api/admin/fundraisers
// get all fundraisers for a ngo
router.get('/fundraisers', auth, adminCheck, async (req, res) => {
  const { dbo } = req.app.locals

  try {
    let fundraisers = await findAll(dbo, 'fundraisers')

    res.json({ fundraisers })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server errror' })
  }
})

// !private
// GET /api/admin/fundraisers/:ngoId
// get all fundraisers for a ngo
router.get('/fundraisers/:ngoId', auth, adminCheck, async (req, res) => {
  const { dbo } = req.app.locals

  try {
    let filter = { ngoId: req.params.ngoId }
    let fundraisers = await findMany(dbo, 'fundraisers', filter)

    res.json({ fundraisers })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server errror' })
  }
})

// !private
// POST /api/admin/ngos
// add new ngo
router.post(
  '/ngos',
  auth,
  adminCheck,
  upload.single('file'),
  async (req, res) => {
    const { dbo } = req.app.locals
    const { name, description, url, location, cause } = req.body
    try {
      let data = {
        name,
        description,
        url,
        location,
        cause,
        subCategories: [],
        logo: req.file.filename,
        createdAt: new Date().toString().substring(4, 24)
      }
      await insertOne(dbo, 'ngos', data)
      res.json({ msg: 'NGO added' })
    } catch (err) {
      console.error(err.message)
      res.status(500).json({ msg: 'Server errror' })
    }
  }
)

// !private
// DELETE /api/admin/ngos/:id
// delete a ngo
router.delete('/ngos/:id', auth, adminCheck, async (req, res) => {
  const { dbo } = req.app.locals

  try {
    let filter = { _id: new ObjectID(req.params.id) }
    await deleteOne(dbo, 'ngos', filter)

    res.json({ msg: 'NGO deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server errror' })
  }
})

// !private
// POST /api/admin/ngos/:ngoId/categories
// add new category
router.post('/ngos/:ngoId/categories', auth, adminCheck, async (req, res) => {
  const { dbo } = req.app.locals
  const { name, description, url } = req.body

  try {
    let data = {
      id: nanoid(),
      name,
      description,
      url,
      createdAt: new Date().toString().substring(4, 24)
    }
    let filter = { _id: new ObjectID(req.params.ngoId) }
    let operation = { $push: { subCategories: data } }

    await updateOne(dbo, 'ngos', filter, operation)
    res.json({ msg: 'Category added' })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server errror' })
  }
})

// !private
// DELETE /api/admin/ngos/:ngoId/categories/:id
// delete a category
router.delete(
  '/ngos/:ngoId/categories/:id',
  auth,
  adminCheck,
  async (req, res) => {
    const { dbo } = req.app.locals
    const { id } = req.params

    try {
      let filter = { _id: new ObjectID(req.params.ngoId) }
      let operation = { $pull: { subCategories: { id } } }

      await updateOne(dbo, 'ngos', filter, operation)
      res.json({ msg: 'Category removed' })
    } catch (err) {
      console.error(err.message)
      res.status(500).json({ msg: 'Server errror' })
    }
  }
)

export default router
