const userRouter = require("express").Router();
const User = require("../models/user");
const { hashPass, initialUsers } = require("../tests/test_helper");

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    likes: 1,
  });
  res.json(users);
});

userRouter.post("/", async (req, res) => {
  const { username, name, password, blogs = [] } = req.body;

  if (password.length < 3)
    res.status(400).send({
      error: "password is too short",
    });

  const hashedPass = await hashPass(password);

  const newUser = new User({
    username,
    name,
    passwordHash: hashedPass,
    blogs,
  });

  await newUser.save();
  res.status(201).json(newUser);
});

userRouter.delete("/remove", async (req, res) => {
  await User.deleteMany({});
  res.status(200).end();
});

module.exports = userRouter;
