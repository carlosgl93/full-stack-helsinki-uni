const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 5
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person"
    }
  ]
});

module.exports = mongoose.model("User", schema);
