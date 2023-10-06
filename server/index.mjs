import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
// import "express-async-errors";
import artworkRoutes from "./routes/artwork.mjs";
import authRoutes from "./routes/auth.mjs";
import auth from "./middleware/auth.mjs";
import User from "./db/userModel.mjs";
import jwt from "jsonwebtoken";

const app = express();
const PORT = process.env.PORT || 8080;

const userVerification = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.userId);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/", userVerification);

// Load the /authentication routes
app.use("/", authRoutes);

// Load the /artwork routes
// app.use("/artwork", artworkRoutes);
app.use("/artwork", auth, artworkRoutes);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send({
    message: "Uh oh! An unexpected error occured.",
    error: {},
  });
});

// start the express server
app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));
