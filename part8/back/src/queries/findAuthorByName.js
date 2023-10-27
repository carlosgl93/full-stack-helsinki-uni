const Author = require("../models/authors");

const findAuthorByName = async (args) => {
    console.log(args)
    const author = await Author.findOne({name: args.name})
    console.log(author)
    return {author}
}

module.exports = { findAuthorByName };
