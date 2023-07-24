const dummy = (blogsArray) => {
  return 1;
};

const sumOfLikes = (blogsArray) => {
  return blogsArray.reduce((acc, current) => acc + current.likes, 0);
};

const mostFavBlog = (blogsArray) =>
  blogsArray.reduce(
    (acc, current) =>
      acc.likes < current.likes ? (acc = { ...current }) : acc,
    { likes: 0 }
  );

module.exports = {
  dummy,
  sumOfLikes,
  mostFavBlog,
};
