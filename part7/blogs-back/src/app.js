const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

const { logger, tokenExtractor, userExtractor } = middleware;

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
app.use(logger);
// app.use(tokenExtractor);
app.use("/api/blogs/", blogRouter);
app.use("/api/users/", userRouter);
app.use("/api/login/", loginRouter);

if (process.env.NODE_ENV === "test") {
  console.log("running on test mode");
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing/", testingRouter);
}
app.use(middleware.errorHandler);

module.exports = app;
