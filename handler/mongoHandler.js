const { ObjectID } = require('mongodb')

const findOneById = (dbo, coll, id) =>
  dbo
    .collection(coll)
    .findOne({ _id: new ObjectID(id) }, { projection: { password: 0 } })

const findOneByEmail = (dbo, coll, email) =>
  dbo.collection(coll).findOne({ email })

const insertOne = (dbo, coll, data) => dbo.collection(coll).insertOne(data)

const verifyUser = (dbo, id) =>
  dbo
    .collection('users')
    .updateOne({ _id: new ObjectID(id) }, { $set: { isVerified: 1 } })

module.exports = {
  findOneById,
  findOneByEmail,
  insertOne,
  verifyUser,
}
