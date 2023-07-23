const morgan = require("morgan")

const unknownEndpoint = (req, res) => {
  res.status(404).send({
    error: "Unknown endpoint",
  })
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Bad request, id malformed" })
  } else if (error.name === "ValidationError") {
    console.log(error)
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

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
  ].join(" ")
})

module.exports = {
  logger,
  unknownEndpoint,
  errorHandler,
}
