import React, { useReducer, ReactNode, FC } from "react";
import { SEVERITY, uiReducer } from "./uiReducer";
import { UiContext } from "./UiContext";

type UiProviderProps = {
  children: React.ReactNode;
};

export type UiState = {
  sideMenuOpen: boolean;
  toast: null | {
    severity: SEVERITY;
    message: string;
  };
};

export const UiProvider: FC<UiProviderProps> = ({ children }) => {
  const initialState: UiState = {
    sideMenuOpen: false,
    toast: null,
  };

  const [state, dispatch] = useReducer(uiReducer, initialState);

  const toggleSideMenu = () =>
    dispatch({
      type: "UI - TOGGLE SIDE MENU",
    });

  const toggleToast = (severity: SEVERITY, message: string) => {
    dispatch({
      type: "UI - TOGGLE TOAST",
      payload: {
        severity,
        message,
      },
    });
    setTimeout(() => {
      dispatch({
        type: "UI - TOGGLE TOAST",
        payload: null,
      });
    }, 5000);
  };

  return (
    <UiContext.Provider value={{ ...state, toggleSideMenu, toggleToast }}>
      {children}
    </UiContext.Provider>
  );
};
