import { User } from "../types";
import { State } from "./Provider";

type ActionType =
  | {
      type: "[Auth]- Login";
      payload: User;
    }
  | {
      type: "[Auth]- Logout";
    };

export const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "[Auth]- Login":
      return { ...state, user: action.payload };
    case "[Auth]- Logout":
      return { ...state, user: null };
    default:
      return state;
  }
};
