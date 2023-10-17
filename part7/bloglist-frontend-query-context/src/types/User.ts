import { Blog } from "./Blog";

export type User = {
  email: string;
  id: string;
  name: string;
  token: string;
  blogs: Blog[];
  author: string;
};
