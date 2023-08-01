const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const { populateBlogs, validateId } = require("../utils/list_helper");
const middleware = require("../utils/middleware");

const { userExtractor } = middleware;

blogRouter.get("/", async (request, response) => {
  const allBlogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(allBlogs).end();
});

blogRouter.get("/:id", async (request, response) => {
  const { id } = request.params;

  console.log("VALIDATING ID", validateId(id));

  if (!validateId(id)) return response.status(400);

  const blog = await Blog.findById(id);
  if (!blog) {
    response.status(404);
  }
  response.json(blog);
});

blogRouter.delete("/remove", async (req, res) => {
  await Blog.deleteMany({});
  res.send(204).end();
});

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const { id } = request.params;

  const user = request.user;

  console.log("USER DELETING", user);

  const blogToDelete = await Blog.findById(id);

  console.log("BLOG TO DELETE", blogToDelete);

  if (blogToDelete.user === user._id.toString()) {
    const deleted = await Blog.findByIdAndDelete(id);
    response.status(204).json(deleted).end();
    return;
  }

  response
    .status(401)
    .send({
      message: "only the owner of the blog can delete this blog",
    })
    .end();
});

blogRouter.post("/", userExtractor, async (request, response) => {
  const newBlog = request.body;

  if (!newBlog.title || !newBlog.url) {
    response
      .status(400)
      .send({
        error: "blog malformed",
      })
      .end();
  }

  const user = request.user;

  if (!user)
    response
      .status(404)
      .send({
        error: "user not found",
      })
      .end();

  const blog = new Blog({
    ...newBlog,
    user: user.id,
    author: user.name,
  });

  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);

  await user.save();
  response.status(201).json(result).end();
});

blogRouter.post("/seed", async (req, res) => {
  await populateBlogs();

  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.put("/:id", async (req, res) => {
  const { title, author, likes, url } = req.body;

  const updatedBlog = {
    title,
    author,
    likes: likes + 1,
    url,
  };

  const result = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, {
    new: true,
  });

  res.json(result);
});

module.exports = blogRouter;
