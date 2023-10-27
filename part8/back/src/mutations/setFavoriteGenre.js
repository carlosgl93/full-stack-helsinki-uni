const User = require("../models/users");
const Book = require("../models/books");
const jwt = require("jsonwebtoken");


const setFavoriteGenre = async (args, context) => {
  console.log('context',context)
  console.log(args);
  
  
  const updatedUser = await User.findOneAndUpdate(
    {
      _id: context.currentUser._id,
    },
    {
      favoriteGenre: args.genre,
    },
    {
      new: true,
    }
  );
  console.log('updatedUser',updatedUser);
  const booksWithGenre = await Book.find({
    genres: {
      $in: [args.genre]
    },
  }).populate("author")
  console.log(booksWithGenre)
  return booksWithGenre
};

module.exports = {
  setFavoriteGenre,
};
