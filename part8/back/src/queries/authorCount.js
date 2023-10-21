const Author = require("../models/authors");

const authorCount = async () => await Author.count();

module.exports = { authorCount };
