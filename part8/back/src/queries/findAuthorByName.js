const Author = require("../models/authors");

const findAuthorByName = async (args) => {
    console.log(args)
    const name = args.name
    const author = await Author.findOne({"name": {'$regex': `${name}`}})
    console.log(author)
    return {author}
}

module.exports = { findAuthorByName };
