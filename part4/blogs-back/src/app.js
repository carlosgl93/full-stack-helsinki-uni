const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blog");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
console.log(`connecting to ${config.MONGODB_URI}`);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to db successfully");
  })
  .catch((error) => {
    console.log(`error connecting to db: ${error.message}`);
    return;
  });

app.use(cors());
app.use(express.json());
app.use(middleware.logger);
app.use("/api/blogs/", blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
