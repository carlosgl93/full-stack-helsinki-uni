import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBlogs, useGetAllBlogsQuery } from "../features/blogs/blogs";

export const BlogsController = () => {
  const { data, error, isLoading } = useGetAllBlogsQuery();
  const dispatch = useDispatch();
  console.log(data);

  useEffect(() => {
    if (data) {
      dispatch(setBlogs(data));
    }
  }, [data]);
  return {
    data,
    error,
    isLoading,
  };
};
