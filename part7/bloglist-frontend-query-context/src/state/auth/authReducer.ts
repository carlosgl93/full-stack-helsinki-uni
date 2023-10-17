import { User } from "@src/types";
import { AuthState } from "./";

type AuthActionType =
  | {
      type: "Auth - Login";
      payload: User;
    }
  | {
      type: "Auth - Logout";
    };

export const authReducer = (
  state: AuthState,
  action: AuthActionType,
): AuthState => {
  switch (action.type) {
    case "Auth - Login":
      return {
        ...state,
        user: action.payload,
      };
    case "Auth - Logout":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
