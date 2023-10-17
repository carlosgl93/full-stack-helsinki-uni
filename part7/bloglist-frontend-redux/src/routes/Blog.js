import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { BlogCard } from "../components";

export const Blog = () => {
  const { blogId } = useParams();

  const blog = useSelector((state) =>
    state.blogs.blogs.find((b) => b.id === blogId),
  );

  return <BlogCard blog={blog} />;
};
