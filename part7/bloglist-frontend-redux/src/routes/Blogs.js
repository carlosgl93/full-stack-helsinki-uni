import { Blog, Loading, Error } from "../components";
import { useGetAllBlogsQuery } from "../services/blogs";

export const Blogs = () => {
  const { data, error, isLoading } = useGetAllBlogsQuery();

  return (
    <div>
      <h2>Blog List</h2>
      {error && <Error />}
      {isLoading && <Loading />}

      {data && data.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};
