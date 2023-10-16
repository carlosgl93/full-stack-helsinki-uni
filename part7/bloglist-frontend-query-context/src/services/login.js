import axios from "axios";
const baseUrl = "/api/login";

export const login = async (credentials) => {
  console.log(credentials);
  const response = await axios.post(baseUrl, credentials);
  console.log(response);
  return response.data;
};
