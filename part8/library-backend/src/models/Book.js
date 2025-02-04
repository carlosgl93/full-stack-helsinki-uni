const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 5
  },
  published: {
    type: Number
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
    minLength: 5
  },
  genres: [
    {
      type: String,
      enum: ["refactoring", "design", "classic", "crime", "revolution", "patterns", "agile", "database", "nosql"]
    }
  ],
  id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  }
});

module.exports = mongoose.model("Book", bookSchema);
