import { createContext } from "react";
import { SEVERITY } from "./uiReducer";

interface UiContextProps {
  sideMenuOpen: boolean;
  toast: null | {
    severity: SEVERITY;
    message: string;
  };

  toggleSideMenu: () => void;
  toggleToast: (severity: SEVERITY, message: string) => void;
}

export const UiContext = createContext({} as UiContextProps);
