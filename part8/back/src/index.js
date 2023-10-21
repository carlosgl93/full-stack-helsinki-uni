const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const { mongoose } = require("mongoose");
const { AuthorModel } = require("./models/authors");
const { BookModel } = require("./models/books");
require("dotenv").config();

mongoose.set("strictQuery", false);

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then((res) => {
  console.log(`Server ready at ${res.url}`);
});
