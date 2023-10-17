import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { Blog } from "../components";
import { Blog as BlogType } from "../types/Blog";
export const Blogs = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: () => blogService.getAll(),
    queryKey: ["blogs"],
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <section>
      {data.map((b: BlogType) => (
        <Blog key={b.id} blog={b} />
      ))}
    </section>
  );
};
