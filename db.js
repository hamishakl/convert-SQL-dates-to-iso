require('dotenv').config()

password = process.env.PASSWORD

const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = `mongodb+srv://hamishakl:${password}@cluster0.yczv0.mongodb.net/strength-tracker?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

async function insert(client, sqlId) {
  let arr = ['Exercise', 'Goals', 'Pr', 'User', 'Volume', 'Workout']
  try {
    await client.connect
    let a
    for (let i = 0; i < arr.length; i++) {
      a = arr[i]
      const collection = client.db('strength-tracker').collection(`${a}`)
      const pipeline = [
        {
          $match: {
            $or: [
              {
                id: sqlId,
              },
              {
                userId: sqlId,
              },
            ],
          },
        },
      ]
      const agg = await collection.aggregate(pipeline).toArray()
      var fs = require('fs')
      fs.writeFile(`${a}Id.json`, JSON.stringify(agg), function (err, result) {
        if (err) console.log('error', err)
      })
      console.log(agg)
    }
  } finally {
    console.log('done')
    client.close()
  }
}

insert(client, 'b072e342-ef79-4893-99f9-81d3298afffc')
