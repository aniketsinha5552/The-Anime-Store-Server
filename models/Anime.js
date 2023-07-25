const mongoose = require("mongoose");

const AnimeSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    releaseYear: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Anime", AnimeSchema);
