import { User } from '../types';
import { State } from './Provider';

type ActionType =
  | {
      type: '[Auth]- Login';
      payload: User;
    }
  | {
      type: '[Auth]- Logout';
    }
  | {
      type: '[Preferences]- Set Favorite Genre';
      payload: string;
    };

export const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case '[Auth]- Login':
      return { ...state, user: action.payload };
    case '[Auth]- Logout':
      return { ...state, user: null };
    case '[Preferences]- Set Favorite Genre':
      return {
        ...state,
        user: {
          token: state.user!.token,
          username: state.user!.username,
          favoriteGenre: action.payload,
        },
      };
    default:
      return state;
  }
};
