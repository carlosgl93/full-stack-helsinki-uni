const { GraphQLError } = require("graphql");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const createUser = async (args) => {
  console.log(args);

  if (!args.username || !args.password) {
    throw new GraphQLError("Missing credentials", {
      extensions: {
        code: "BAD_USER_INPUT",
      },
    });
  }

  const newUser = new User({
    username: args.username,
    password: args.password,
  });

  await newUser.save().catch((error) => {
    throw new GraphQLError("Creating user failed", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: args.username,
        error,
      },
    });
  });

  // Create a payload object with the user's data
  const payload = {
    id: newUser._id,
    username: newUser.username,
  };

  // Sign the JWT with the payload
  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return {
    username: newUser.username,
    value: token,
    id: newUser._id,
  };
};

module.exports = {
  createUser,
};
