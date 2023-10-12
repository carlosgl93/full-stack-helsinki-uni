import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;
console.log(token);

const setToken = (newToken) => {
  console.log(newToken);
  token = `Bearer ${newToken}`;
  console.log("token", token);
};

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

// eslint - disable - next - line;
export default {
  // getAll,
  getBlog,
  create,
  setToken,
  likeBlog,
  deleteBlog,
};
