import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const loginWithToken = async (token) => {
  const response = await axios.post(`${baseUrl}/tokenLogin`, token);
  return response.data;
};

// eslint-disable-next-line
export { login, loginWithToken };
