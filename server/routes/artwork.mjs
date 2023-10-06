import express from "express";
import db from "../db/connection.mjs";
import { ObjectId } from "mongodb";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const router = express.Router();

const S3_BUCKET = "art--collection";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
});
// const upload = multer({ dest: "uploads/" });

// Get a list of 50 posts
router.get("/", async (req, res) => {
  console.log("get /artwork/:user");
  const query = { user: `${req.user.userId}` };
  let collection = await db.collection("artwork");
  let results = await collection.find(query).toArray();
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

router.post("/image", upload.single("image"), async (req, res) => {
  res.send(`s3://art--collection/${req.file.key}`);
});

// Add a new document to the collection
router.post("/", upload.single("image"), async (req, res) => {
  console.log("post artwork/:user");
  console.log(req.body);
  const imageKey = req.file.key;
  let collection = await db.collection("artwork");
  let newDocument = { ...req.body, image: imageKey, user: req.user.userId };
  console.log("new Doc: ", newDocument);
  let result = await collection.insertOne(newDocument);
  res.send(result.insertedId).status(204);
});

// Update an artwork entry
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
  let entry = await collection.findOne(query);
  console.log(entry);
  let result = await collection.deleteOne(query);

  s3.deleteObject(
    {
      Bucket: S3_BUCKET,
      Key: entry.image,
    },
    (err, data) => {}
  );

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
