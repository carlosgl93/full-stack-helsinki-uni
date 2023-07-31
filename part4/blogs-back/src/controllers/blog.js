const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const { populateBlogs, validateId } = require("../utils/list_helper");

blogRouter.get("/", async (request, response) => {
  const allBlogs = await Blog.find({});
  response.json(allBlogs);
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

blogRouter.delete("/:id", async (request, response) => {
  const deleted = await Blog.findByIdAndDelete(request.params.id);
  response.json(deleted).status(204);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.title || !blog.url) {
    response.status(400).end();
  }

  const result = await blog.save();
  response.status(201).json(result);
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

  // const { id } = req.params;
  // console.log("id", id);

  // const blogToUpdate = await Blog.findById(id);
  // // const newLikes = blogToUpdate
  // console.log("BLOG TO UPDATE", blogToUpdate);

  // const updatedBlog = {
  //   ...blogToUpdate,
  //   likes: blogToUpdate.likes + 1,
  // };

  // console.log("UPDATED BLOG", updatedBlog);

  // const updated = await Blog.findOneAndReplace(id, updatedBlog, { new: true });
  // res.status(200).json(updated);
});

module.exports = blogRouter;
