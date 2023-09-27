import express from "express";
// import cors from "cors";
import "./loadEnvironment.mjs";
// import "express-async-errors";
import posts from "./routes/posts.mjs";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
// app.use(cors);

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

// Load the /posts routes
app.use("/art", posts);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

// start the express server
app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));

// CRUD Application
// Create ==> POST
// Read ===> GET
// Update ==> PUT
// Delete ==> DELETE

// app.get("/movie/:title", (req, res) => {
//   const { title } = req.params;
//   run(title).catch(console.dir);
//   res.status(200).send({
//     tshirt: "👕",
//     size: "large",
//   });
// });

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
