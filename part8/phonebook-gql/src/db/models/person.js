const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2
  },
  phone: {
    type: String,
    minLength: 5
  },
  street: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("Person", schema);
