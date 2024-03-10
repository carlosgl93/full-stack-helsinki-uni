import axios from "axios";

export const flightsApi = axios.create({
  baseURL: "http://localhost:3000/api"
});
