const { MongoClient } = require("mongodb");
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_URI

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('mydatabase');
    const movies = database.collection('landmark');

    // Query for a movie that has the title 'Back to the Future'
    const query = { name: 'The broad' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);