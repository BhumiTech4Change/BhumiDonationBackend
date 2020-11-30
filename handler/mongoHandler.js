const { ObjectID } = require('mongodb')

const findOneById = (dbo, coll, id) =>
  dbo
    .collection(coll)
    .findOne({ _id: new ObjectID(id) }, { projection: { password: 0 } })

const findOneByEmail = (dbo, coll, email) =>
  dbo.collection(coll).findOne({ email }, { projection: { password: 0 } })

module.exports = {
  findOneById,
  findOneByEmail,
}
