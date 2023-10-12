const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "Invalid email or password",
    });
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 7 * 24 * 60 * 60,
  });

  res
    .status(200)
    .send({ token, email: user.email, name: user.name, id: user._id });
});

loginRouter.post("/tokenLogin", async (req, res) => {
  console.log(req.query);
  const token = req.query.token;
  const decodedToken = jwt.decode(token);
  console.log(decodedToken);

  const verifyToken = jwt.verify(token, process.env.SECRET);
  console.log(`verifyToken`, verifyToken);

  if (Date.now() / 1000 >= decodedToken.exp) {
    return res.status(400).send({
      message: "Token expired, relogin",
    });
  }

  const user = await User.findOne({ email: decodedToken.email });

  console.log(user);

  if (user) {
    return res.status(200).send({
      message: "User logged in with token",
      user,
    });
  } else {
    return res.status(400).send(user);
  }
});

module.exports = loginRouter;
