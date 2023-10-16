import { UiState } from "./UiProvider";

export enum SEVERITY {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARN = "warn",
}

type ToggleToastPayload = {
  severity: SEVERITY;
  message: string;
};

type UiActionType =
  | {
      type: "UI - TOGGLE SIDE MENU";
    }
  | {
      type: "UI - TOGGLE TOAST";
      payload: ToggleToastPayload;
    };

export const uiReducer = (state: UiState, action: UiActionType) => {
  switch (action.type) {
    case "UI - TOGGLE SIDE MENU":
      return {
        ...state,
        sideMenuOpen: !state.sideMenuOpen,
      };

    case "UI - TOGGLE TOAST":
      return {
        ...state,
        toastOpen: !state.toastOpen,
      };
  }
};
