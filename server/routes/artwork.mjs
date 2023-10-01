import express from "express";
import db from "../db/connection.mjs";
import { ObjectId } from "mongodb";
import AWS from "aws-sdk";

const router = express.Router();

const S3_BUCKET = "art--collection";
const REGION = "us-east-1";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

// Get a list of 50 posts
router.get("/", async (req, res) => {
  console.log("made it to here");
  let collection = await db.collection("artwork");
  let results = await collection.find({}).toArray();

  res.send(results).status(200);
});

// // Get a single post
// router.get("/:id", async (req, res) => {
//   let collection = await db.collection("posts");
//   let query = { _id: ObjectId(req.params.id) };
//   let result = await collection.findOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// Add a new document to the collection
router.post("/", async (req, res) => {
  let collection = await db.collection("artwork");
  let newDocument = req.body;

  const params = {
    ACL: "public-read",
    Body: req.body.image,
    Bucket: S3_BUCKET,
    Key: req.body.image.name,
  };

  myBucket.putObject(params).send((err) => {
    if (err) console.log(err);
  });

  let result = await collection.insertOne(newDocument);
  console.log(result.insertedId);
  res.send(result.insertedId).status(204);
});

// // Update an artwork entry
router.put("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = { $set: req.body };
  console.log(req.body);

  let collection = await db.collection("artwork");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// Delete an entry
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("artwork");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;

// import express from "express";
// import db from "../db/connection.mjs";
// import { ObjectId } from "mongodb";

// const router = express.Router();

// // Get a list of 50 posts
// router.get("/", async (req, res) => {
//   console.log(req);
//   // let collection = await db.collection("posts");
//   // let results = await collection.find({}).limit(50).toArray();

//   // res.send(results).status(200);
//   res.send("hello").status(200);
// });

// export default router;
