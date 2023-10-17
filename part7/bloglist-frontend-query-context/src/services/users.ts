import { User } from "@src/types";
import axios from "axios";
const baseUrl = "/api/users";

export const getAllUsers = async (): Promise<User[]> =>
  (await axios.get(baseUrl)).data;
