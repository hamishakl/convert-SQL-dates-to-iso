require('dotenv').config()

password = process.env.PASSWORD

const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = `mongodb+srv://hamishakl:${password}@cluster0.yczv0.mongodb.net/strength-tracker?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

async function insert(client) {
  let sqlId
  const users = [
    "b072e342-ef79-4893-99f9-81d3298afffc",
    "b5112e9f-5ea6-41ef-9555-f10e17d17327",
    "b2d8fc26-0a12-47f1-bfa5-dc1a8797b1a6",
    "8d69b3c6-060d-429e-8405-f06f571a0868"
  ]
  let arr = ['Exercise', 'Goals', 'Pr', 'User', 'Volume', 'Workout']
  try {
    for (let i = 0; i < users.length; i++) {
      sqlId = users[i]
      
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
        try {
          fs.mkdirSync(`./users/${sqlId}`)
        } catch (error) {
          if (error.code === 'EEXIST') {
            console.log('folder already made')
          }
        }
        fs.writeFile(`./users/${sqlId}/${a}.json`, JSON.stringify(agg), function (err, result) {
          if (err) console.log('error', err)
        })
        console.log(agg)
      }
    }
  } finally {
    console.log('done')
    client.close()
  }
}

const users = [
  "b072e342-ef79-4893-99f9-81d3298afffc",
  "b5112e9f-5ea6-41ef-9555-f10e17d17327",
  "b2d8fc26-0a12-47f1-bfa5-dc1a8797b1a6",
  "8d69b3c6-060d-429e-8405-f06f571a0868"
]

insert(client, 'b072e342-ef79-4893-99f9-81d3298afffc')
