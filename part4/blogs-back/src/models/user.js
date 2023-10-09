const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  passwordHash: {
    type: String,
    minLength: 3,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = model("User", userSchema);

module.exports = User;
