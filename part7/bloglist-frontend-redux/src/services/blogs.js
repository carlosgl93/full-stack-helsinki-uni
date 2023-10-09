import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = "/api/blogs";

export const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3003/api/",
  }),
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => "blogs",
    }),
  }),
});

export const { useGetAllBlogsQuery } = blogsApi;

let token = null;
console.log(token);

const setToken = (newToken) => {
  console.log(newToken);
  token = `Bearer ${newToken}`;
  console.log("token", token);
};

// const getAll = () => {
//   const request = axios.get(baseUrl);
//   return request.then((response) => response.data);
// };
const getBlog = async (id) => {
  console.log("is it here?");
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.post(baseUrl, newBlog, config);
  return request.data;
};

const likeBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, config);
  return request.data;
};

const deleteBlog = async (blogId) => {
  console.log(token);
  const config = {
    headers: { Authorization: token },
  };
  console.log("CONFIG", config);

  const request = await axios.delete(`${baseUrl}/${blogId}`, config);
  return request.data;
};

// eslint-disable-next-line
export default {
  // getAll,
  getBlog,
  create,
  setToken,
  likeBlog,
  deleteBlog,
};
