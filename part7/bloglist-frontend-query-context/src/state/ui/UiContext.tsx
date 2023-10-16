import { createContext } from "react";
import { SEVERITY } from "./uiReducer";

interface UiContextProps {
  sideMenuOpen: boolean;
  toastOpen: boolean;

  toggleSideMenu: () => void;
  toggleToast: (severity: SEVERITY, message: string) => void;
}

export const UiContext = createContext({} as UiContextProps);
