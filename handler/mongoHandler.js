const { ObjectID } = require('mongodb')

const findAll = (dbo, coll) => dbo.collection(coll).find({}).toArray()

const findOneById = (dbo, coll, id) =>
  dbo
    .collection(coll)
    .findOne({ _id: new ObjectID(id) }, { projection: { password: 0 } })

const findOne = (dbo, coll, filter) => dbo.collection(coll).findOne(filter)

const findMany = (dbo, coll, filter) =>
  dbo.collection(coll).find(filter).toArray()

const insertOne = (dbo, coll, data) => dbo.collection(coll).insertOne(data)

const verifyUser = (dbo, id) =>
  dbo
    .collection('users')
    .updateOne({ _id: new ObjectID(id) }, { $set: { isVerified: 1 } })

module.exports = {
  findOneById,
  findOne,
  insertOne,
  verifyUser,
  findAll,
  findMany,
}
