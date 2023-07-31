const { blogs } = require("../initialData");
const Blog = require("../models/blog");
const ObjectId = require("mongoose").Types.ObjectId;

const dummy = (blogsArray) => {
  return 1;
};

const validateId = async (id) => {
  return await ObjectId.isValid(id);
};

const totalLikes = (blogsArray) => {
  return blogsArray.reduce((acc, current) => acc + current.likes, 0);
};

const mostFavBlog = (blogsArray) => {
  const mostFav = blogsArray.reduce(
    (acc, current) =>
      acc.likes < current.likes ? (acc = { ...current }) : acc,
    { likes: 0 }
  );
  return mostFav;
};

const populateBlogs = async () => {
  blogs.map(async (b) => {
    const newBlog = new Blog(b);
    await newBlog.save();
  });
};

module.exports = {
  dummy,
  totalLikes,
  mostFavBlog,
  populateBlogs,
  validateId,
};
