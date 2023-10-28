const Author = require("../models/authors");

const editAuthor = async (args) => {
  console.log(args);
  const updatedAuthor = await Author.findOneAndUpdate(
    {
      name: args.name.lowerCase(),
    },
    {
      born: args.year,
    },
    {
      new: true,
    }
  );
  console.log(updatedAuthor);
  return updatedAuthor;
};

module.exports = {
  editAuthor,
};
