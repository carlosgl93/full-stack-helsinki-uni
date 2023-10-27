import { FC, ReactNode, useEffect, useReducer } from "react";
import { Context } from "./Context";
import { reducer } from "./reducer";
import { User } from "../types";
import { useApolloClient } from "@apollo/client";

export interface State {
  user: null | User;
}

type ProviderProps = {
  children: ReactNode;
};

const _INITIAL_STATE: State = {
  user: null,
};

const Provider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, _INITIAL_STATE);
  const client = useApolloClient();

  useEffect(() => {
    const user = localStorage.getItem('blogs-gql');
    if (user) {
      dispatch({
        type: '[Auth]- Login',
        payload: JSON.parse(user),
      });
    }
  }, [state?.user?.token]);

  const login = (user: User) => {
    dispatch({
      type: '[Auth]- Login',
      payload: user,
    });
  };

  const logout = () => {
    localStorage.clear();
    client.clearStore();
    dispatch({
      type: '[Auth]- Logout',
    });
  };

  const setUserFavoriteGenre = (genre: string) => {
    dispatch({
      type: '[Preferences]- Set Favorite Genre',
      payload: genre,
    });
  };

  return (
    <Context.Provider
      value={{
        ...state,

        login,
        logout,
        setUserFavoriteGenre,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
