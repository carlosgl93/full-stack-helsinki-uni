const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  born: {
    type: Number
  },
  bookCount: { type: Number },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  }
});

module.exports = mongoose.model("Author", authorSchema);
