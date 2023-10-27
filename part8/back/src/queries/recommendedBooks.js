const Book = require("../models/books");

const recommendedBooks = async (args) => {
    console.log(args)
    const recommendedBooks = await Book.find({
        genres: {
            $in: [args.genre]
        }
    }).populate("author")
    console.log(recommendedBooks)
    return recommendedBooks
}

module.exports = { recommendedBooks };
