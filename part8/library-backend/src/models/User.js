const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 5
  },
  favoriteGenre: {
    type: String,
    required: true,
    enum: ["refactoring", "design", "classic", "crime", "revolution", "patterns", "agile", "database", "nosql"]
  }
});

module.exports = mongoose.model("User", userSchema);
