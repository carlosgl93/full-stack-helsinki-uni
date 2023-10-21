"use strict";
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
startStandaloneServer(server, {
    listen: { port: 4000 },
}).then((res) => {
    console.log(`Server ready at ${res.url}`);
});
