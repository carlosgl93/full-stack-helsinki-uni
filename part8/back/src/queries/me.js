const User = require("../models/users");

const me = (ctx) => {
  console.log(ctx);
  return ctx.currentUser;
};

module.exports = {
  me,
};
