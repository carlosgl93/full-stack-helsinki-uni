import axios from "axios";
const baseUrl = "/api/login";

export const login = async (credentials) => {
  console.log(credentials);
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};
