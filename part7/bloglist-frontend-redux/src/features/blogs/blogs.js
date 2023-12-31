import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../services/auth";
const baseUrl = "/api/blogs";

const initialState = {
  blogs: [],
};

const blogsAdapter = createEntityAdapter({});

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      return {
        ...state,
        blogs: action.payload,
      };
    },
    clearBlogs: () => {
      return initialState;
    },
  },
});

export const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => ({
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),
    createBlog: builder.mutation({
      query: ({ blog, token }) => {
        return {
          method: "POST",
          body: { blog },
          headers: {
            authorization: token,
          },
        };
      },
      invalidatesTags: ["blogs"],
    }),
    likeBlog: builder.mutation({
      query: (blog) => {
        console.log("BLOG REDUCER", blog);
        return {
          url: `/${blog.id}`,
          method: "PUT",
          body: { blog },
          // headers: {
          //   authorization: token,
          // },
        };
      },

      invalidatesTags: (result, error, arg) => [{ type: "blogs", id: arg.id }],
    }),
    getBlog: builder.query({
      query: (id, token) => {
        return {
          url: `/${id}`,
          method: "GET",
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["blog"],
    }),
  }),
});
export const { setBlogs, clearBlogs } = blogsSlice.actions;
export default blogsSlice.reducer;
export const {
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useLikeBlogMutation,
  useGetBlogQuery,
} = blogsApi;
