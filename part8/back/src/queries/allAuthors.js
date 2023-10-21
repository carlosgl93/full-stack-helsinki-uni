const Author = require("../models/authors");
const Book = require("../models/books"); // Import the Book model

const allAuthors = async (args) => {
  return await Author.aggregate([
    {
      $lookup: {
        from: "books", // Use the name of the books collection in your database
        localField: "_id",
        foreignField: "author",
        as: "books",
      },
    },
    {
      $project: {
        name: 1,
        born: 1,
        bookCount: { $size: "$books" }, // Calculate the bookCount as the size of the 'books' array
      },
    },
  ]);
};

module.exports = {
  allAuthors,
};
