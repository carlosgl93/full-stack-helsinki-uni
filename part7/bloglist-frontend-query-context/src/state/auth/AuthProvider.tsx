import React, { FC, ReactNode, useReducer } from "react";
import { AuthContext, authReducer } from "./";
import { User } from "@src/types/User";

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthState {
  user: User;
}

const Auth_INITIAL_STATE: AuthState = {
  user: {
    email: "",
    id: "",
    name: "",
    token: "",
  },
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
