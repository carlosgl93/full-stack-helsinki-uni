import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import mongoose from "mongoose";
import "dotenv/config";
mongoose.set("strictQuery", false);
const MONGODB_URI = process.env.MONGODB_URI;
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
startStandaloneServer(server, {
    listen: { port: 4000 },
}).then((res) => {
    console.log("connected to ", MONGODB_URI);
    console.log("ASDFASSADF");
    console.log(`Server ready at ${res.url}`);
});
