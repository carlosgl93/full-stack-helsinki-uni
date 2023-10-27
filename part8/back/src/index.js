const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const { mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const users = require("./models/users")
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
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(  
        auth.substring(7),
        process.env.JWT_SECRET
      );
      console.log("decodedToken", decodedToken);
      const currentUser = await users.findById(decodedToken.id);
      console.log("current User", currentUser);
      return { currentUser };
    }
  },
}).then((res) => {
  console.log(`Server ready at ${res.url}`);
  console.log(res);
});
