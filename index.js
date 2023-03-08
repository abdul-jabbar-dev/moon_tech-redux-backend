require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb://localhost:27017`;
const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = client.db("pc_component");
const productCollection = db.collection("processor");

app.get("/products", async (req, res) => {
  const product = await productCollection.find({}).toArray();

  res.send(product);
});

app.post("/product", async (req, res) => {
  const product = req.body;
  console.log(product)
  const result = await productCollection.insertOne(product);

  res.send(result);
});

app.delete("/product/:id", async (req, res) => {
  const id = req.params.id;

  const result = await productCollection.deleteOne({ _id: ObjectId(id) });
  res.send(result);
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
