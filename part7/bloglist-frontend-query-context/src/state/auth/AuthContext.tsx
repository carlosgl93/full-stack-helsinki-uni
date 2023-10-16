import { createContext } from "react";

interface ContextProps {
  user: {
    email: string;
    id: string;
    name: string;
    token: string;
  };
}
export const AuthContext = createContext({} as ContextProps);
