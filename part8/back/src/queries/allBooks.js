const Book = require("../models/books");

const allBooks = async (args) => {
  return await Book.find().populate("author");
};

module.exports = {
  allBooks,
};
