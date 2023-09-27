require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 8080;

const { MongoClient } = require("mongodb");
const uri = process.env.ATLAS_URI || "";

const client = new MongoClient(uri);

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.get("/movie/:title", (req, res) => {
  const { title } = req.params;
  run(title).catch(console.dir);
  res.status(200).send({
    tshirt: "👕",
    size: "large",
  });
});

// app.get("/tshirt", (req, res) => {
//   res.status(200).send({
//     tshirt: "👕",
//     size: "large",
//   });
// });

// app.post("/tshirt/:id", (req, res) => {
//   const { id } = req.params;
//   const { logo } = req.body;

//   if (!logo) {
//     res.status(418).send({ message: "We need a logo!" });
//   }

//   res.status(200).send({
//     tshirt: `👕 with your logo of ${logo} and id of ${id}`,
//   });
// });

// app.post("/artwork", (req, res) => {
//   const { art } = req.body;
// });

app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));
