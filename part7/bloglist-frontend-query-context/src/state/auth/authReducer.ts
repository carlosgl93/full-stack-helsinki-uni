import { User } from "@src/types";
import { AuthState } from "./";

type AuthActionType = {
  type: "Auth - Login";
  payload: User;
};

export const authReducer = (
  state: AuthState,
  action: AuthActionType,
): AuthState => {
  switch (action.type) {
    case "Auth - Login":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
