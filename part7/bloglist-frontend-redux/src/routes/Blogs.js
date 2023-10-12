import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Blog, Loading, Error, BlogCard } from "../components";
import { BlogsController } from "./BlogsController";

export const Blogs = () => {
  const { data, error, isLoading } = BlogsController();

  return (
    <div>
      <h2>Blog List</h2>
      {error && <Error />}
      {isLoading && <Loading />}

      {data &&
        data.map((blog) => (
          <Link key={blog.id} component={RouterLink} to={`/blogs/${blog.id}`}>
            <BlogCard blog={blog} />
          </Link>
        ))}
    </div>
  );
};
