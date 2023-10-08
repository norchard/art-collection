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

app.post("/api", userVerification);

// Load the /authentication routes
app.use("/api", authRoutes);

// Load the /artwork routes
app.use("/api/artwork", auth, artworkRoutes);
// app.use("/artwork", artworkRoutes);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send({
    message: "Uh oh! An unexpected error occured.",
    error: {},
  });
});

// start the express server
app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));
