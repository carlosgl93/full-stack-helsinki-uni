const Author = require("../models/authors");
const Book = require("../models/books");

const allAuthors = async (args) => {
  let allAuthors = await Author.find()
  const allBooks = await Book.find().populate('author')

console.log(allBooks)
let authorsDic = {}
const asdf = allBooks.map(b => {
  if (authorsDic[b.author.name] === undefined) {
    authorsDic[b.author.name] = 1
  } else {
    authorsDic[b.author.name] += 1
  }
})

  const result = allAuthors.map(a => ({
    id: a._id,
    name: a.name,
    born: a.born ? a.born : null,
    bookCount: authorsDic[a.name] 
  }))
  
  return result
};

module.exports = {
  allAuthors,
};
