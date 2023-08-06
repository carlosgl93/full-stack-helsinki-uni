const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const unknownEndpoint = (req, res, next) => {
  console.log("failing", req);
  res.status(404).send({
    error: "Unknown endpoint",
  });
  next();
};

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Bad request, id malformed" });
  } else if (error.name === "ValidationError") {
    console.log(error);
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  } else {
    next(error);
  }
};

const logger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    req.method === "POST" ? JSON.stringify(req.body) : "",
  ].join(" ");
});

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");

  console.log("AUTH", authorization);
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
    next();
  } else {
    next();
  }
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.decode(request.token, process.env.SECRET);
  console.log("DECODED TOKEN", decodedToken);
  if (!decodedToken || !decodedToken.id) {
    response.status(401).json({ error: "Token invalid" }).end();
  }

  const user = await User.findById(decodedToken.id);
  if (user) {
    request.user = user;
  }
  next();
};

module.exports = {
  logger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
