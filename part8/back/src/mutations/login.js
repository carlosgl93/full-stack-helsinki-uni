const { GraphQLError } = require("graphql");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const login = async (args) => {
  console.log(args);
  const user = await User.findOne({
    username: args.username,
  });

  if (!user) {
    throw new GraphQLError("User not found", {
      extensions: {
        code: "BAD_USER_INPUT",
      },
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  return {
    value: jwt.sign(userForToken, process.env.JWT_SECRET),
  };
};

module.exports = {
  login,
};
