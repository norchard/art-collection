import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
// import "express-async-errors";
import artwork from "./routes/artwork.mjs";
import auth from "./routes/auth.mjs";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

// Load the /artwork routes
app.use("/", auth);

// Load the /artwork routes
app.use("/artwork", artwork);

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
