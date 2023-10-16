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
  user: null,
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

  const updateUserState = (user: User) => {
    dispatch({
      type: "Auth - Login",
      payload: user,
    });
  };

  const logoutUser = () => {
    dispatch({
      type: "Auth - Logout",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        updateUserState,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
