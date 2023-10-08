import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name!"],
    unique: false,
  },

  artist: {
    type: String,
    required: [true, "Please provide an artist's name!"],
    unique: false,
  },

  medium: {
    type: String,
    required: [true, "Please provide a medium!"],
    unique: false,
  },

  date: {
    type: String,
    required: [true, "Please provide a date!"],
    unique: false,
  },

  dimensions: {
    type: String,
    required: [true, "Please provide dimensions!"],
    unique: false,
  },

  image: {
    type: String,
    required: [true, "Please provide an image key!"],
    unique: false,
  },
});

export default mongoose.model("Artwork", artworkSchema);
