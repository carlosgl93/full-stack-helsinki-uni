const userRouter = require("express").Router();
const User = require("../models/user");
const { hashPass, initialUsers } = require("../tests/test_helper");
const jwt = require("jsonwebtoken");
userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    likes: 1,
  });
  res.json(users);
});

userRouter.post("/", async (req, res) => {
  const { firstname, email, password } = req.body;

  if (password.length < 3)
    res.status(400).send({
      error: "password is too short",
    });

  const userAlreadyCreated = await User.findOne({ email });

  if (userAlreadyCreated)
    return res.status(400).json({
      message: "Email already has an account",
    });

  const hashedPass = await hashPass(password);
  const userForToken = {
    firstname,
    email,
    hashedPass,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60 * 4,
  });

  const newUser = new User({
    name: firstname,
    email,
    passwordHash: hashedPass,
  });

  await newUser.save();
  res.status(201).json({
    message: "Account created successfully",
    user: { ...newUser, token },
  });
});

userRouter.delete("/remove", async (req, res) => {
  await User.deleteMany({});
  res.status(200).end();
});

module.exports = userRouter;
