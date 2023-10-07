import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
// import "express-async-errors";
import artworkRoutes from "./routes/artwork.mjs";
import authRoutes from "./routes/auth.mjs";
import auth from "./middleware/auth.mjs";
import userVerification from "./middleware/userVerification.mjs";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/", userVerification);

// Load the /authentication routes
app.use("/", authRoutes);

// Load the /artwork routes
app.use("/artwork", auth, artworkRoutes);
// app.use("/artwork", artworkRoutes);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send({
    message: "Uh oh! An unexpected error occured.",
    error: {},
  });
});

const path = require("path");

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../client/build")));

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

// start the express server
app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));
