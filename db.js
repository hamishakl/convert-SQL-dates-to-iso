require('dotenv').config()

password = process.env.PASSWORD

const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = `mongodb+srv://hamishakl:${password}@cluster0.yczv0.mongodb.net/strength-tracker?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})
client.connect(async (err) => {
  const collection = client.db('strength-tracker').collection('exercises')
  const convert = [
    {
      $addFields: {
        createdAt: {
          $toDate: '$createdAt',
        },
      },
    },
  ]

  const agg = await collection.aggregate(convert).toArray()
  console.log(agg)
  client.close()
})
