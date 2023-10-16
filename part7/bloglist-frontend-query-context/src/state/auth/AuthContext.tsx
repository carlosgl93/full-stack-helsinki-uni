import { User } from "@src/types";
import { createContext } from "react";

interface ContextProps {
  user: {
    email: string;
    id: string;
    name: string;
    token: string;
  } | null;

  updateUserState: (user: User) => void;
  logoutUser: () => void;
}
export const AuthContext = createContext({} as ContextProps);
