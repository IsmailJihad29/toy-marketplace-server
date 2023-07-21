const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Figlandia Server Is running ");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kz2rvmj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    
    await client.connect();

// collections 
    const toysCollection = client.db("figlandiaDb").collection("toys");
    const reviewsCollection = client.db("figlandiaDb").collection("reviews");
    const usersCollection = client.db("figlandiaDb").collection("users")

    app.get("/toys", async (req, res) => {
      const result = await toysCollection.find().toArray();
      res.send(result);
    });

    app.get("/toys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await toysCollection.findOne(query);
      res.send(result);
    });

    app.get("/reviews", async (req, res) => { 
      const result = await reviewsCollection.find().toArray();
      res.send(result);

    })

    app.post("/toys", async (req, res) => { 
      const toys = req.body
      console.log('new toy', toys);
      const result = await toysCollection.insertOne(toys);
      res.send(result)
    })

    app.delete("/toys/:id", async (req, res) => { 
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await toysCollection.deleteOne(query)
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(`Figladia Server is listening on ${port}`);
});
