import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
console.log(token);

const setToken = (newToken) => {
  console.log(newToken);
  token = `Bearer ${newToken}`;
  console.log("token", token);
};

export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export const createBlog = async (newBlog) => {
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

const deleteBlog = async (blogId, userToken) => {
  console.log(userToken);
  const config = {
    headers: { Authorization: userToken },
  };
  console.log("CONFIG", config);

  const request = await axios.delete(`${baseUrl}/${blogId}`, config);
  return request.data;
};

// eslint-disable-next-line
export default { getAll, createBlog, setToken, likeBlog, deleteBlog };
