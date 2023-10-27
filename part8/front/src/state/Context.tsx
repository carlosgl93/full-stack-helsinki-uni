import { createContext } from "react";
import { User } from "../types";

interface ContextProps {
  user: null | User;

  login: (user: User) => void;
  logout: () => void;
  setUserFavoriteGenre: (genre: string) => void;
}

export const Context = createContext({} as ContextProps);
