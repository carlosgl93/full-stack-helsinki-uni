const Book = require("../models/books");

const bookCount = async () => await Book.count();

module.exports = { bookCount };
