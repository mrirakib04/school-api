import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import geolib from "geolib";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3030;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_ACCESS}@cluster0.bfqzn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );

    // Connections
    const database = client.db("school_api");
    const schoolssCollection = database.collection("schools");

    // add school posting
    app.post("/addSchool", async (req, res) => {
      const { name, address, latitude, longitude } = req.body;

      if (!name || !address || !latitude || !longitude) {
        return res.status(400).send({ message: "All fields are required." });
      }

      if (
        typeof name !== "string" ||
        typeof address !== "string" ||
        typeof latitude !== "number" ||
        typeof longitude !== "number"
      ) {
        return res.status(400).send({ message: "Invalid input types." });
      }

      const newSchool = { name, address, latitude, longitude };
      const result = await schoolCollection.insertOne(newSchool);
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("School APIs server");
});

app.listen(port, () => {
  console.log(`School APIs server listening on port ${port}`);
});
