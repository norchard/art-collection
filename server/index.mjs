import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
// import "express-async-errors";
import artworkRoutes from "./routes/artwork.mjs";
import authRoutes from "./routes/auth.mjs";
import auth from "./auth.mjs";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

// Load the /authentication routes
app.use("/", authRoutes);

// Load the /artwork routes
// app.use("/artwork", artworkRoutes);
app.use("/artwork", auth, artworkRoutes);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

// start the express server
app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));
