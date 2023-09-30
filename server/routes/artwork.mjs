import express from "express";
import db from "../db/connection.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of 50 posts
router.get("/", async (req, res) => {
  console.log("made it to here");
  let collection = await db.collection("artwork");
  let results = await collection.find({}).limit(50).toArray();

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
  console.log(req.body);
  let newDocument = req.body;
  // newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  console.log(result.insertedId);
  res.send(result.insertedId).status(204);
});

// // Update an artwork entry
router.put("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = req.body;
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
