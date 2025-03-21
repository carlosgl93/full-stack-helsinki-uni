const mongoose = require("mongoose");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

mongoose.set("strictQuery", false);
const Person = require("./src/db/models/person");
const User = require("./src/db/models/user");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(error => {
    console.log("error connecting to mongo db: ", error.message);
  });

const typeDefs = `
    type User {
      username: String!
      friends: [Person!]!
      id: ID!
    }
      
    type Token {
      value: String!
    }

    enum YesNo {
        YES
        NO
    }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }
    
  type Mutation {
    addPerson (
        name: String!
        phone: String
        street: String!
        city: String!
    ): Person
    
    editNumber(
    name: String!
    phone: String!
    ): Person
    
    createUser(username: String!): User
    
    login(
      username: String!
      password: String!
    ): Token
    
    addAsFriend(name: String!): User
  }
`;

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      // TODO:
      if (!args.phone) {
        return Person.find({});
      }
      return Person.find({ phone: { $exists: args.phone === "YES" } });
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
    me: (root, args, ctx) => {
      console.log(ctx);
      return ctx.currentUser;
    }
  },

  Mutation: {
    addPerson: async (root, args, ctx) => {
      const person = new Person({ ...args });
      const { currentUser } = ctx;

      if (!currentUser) {
        throw new ForbiddenGQLError();
      }

      try {
        await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      } catch (error) {
        throw new GraphQLError("Saving person failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error
          }
        });
      }

      return person;
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      person.phone = args.phone;
      try {
        await person.save();
      } catch (error) {
        throw new GraphQLError("Saving number failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error
          }
        });
      }
      return person;
    },
    createUser: async (root, args) => {
      if (await User.findOne({ username: args.username })) {
        throw new GraphQLError("That username is already used", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username
          }
        });
      }
      const user = new User({ username: args.username });
      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error
          }
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({
        username: args.username
      });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("User not found or wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id
      };

      return {
        value: jwt.sign(userForToken, process.env.JWT_SECRET)
      };
    },
    addAsFriend: async (root, args, { currentUser }) => {
      if (!currentUser) throw new ForbiddenGQLError();
      const isFriend = person => currentUser.friends.map(f => f._id.toString()).includes(person._id.toString());
      const person = await Person.findOne({ name: args.name });
      if (!isFriend(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }

      await currentUser.save();
      return currentUser;
    }
  },

  Person: {
    address: root => {
      return {
        street: root.street,
        city: root.city
      };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

startStandaloneServer(server, {
  listen: { port: 4001 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id).populate("friends");
      return { currentUser };
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

class ForbiddenGQLError extends GraphQLError {
  constructor() {
    throw new GraphQLError("You are not authorized to perform this action.", {
      extensions: {
        code: "FORBIDDEN"
      }
    });
  }
}
