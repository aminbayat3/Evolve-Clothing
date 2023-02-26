import { AnyAction } from "redux";

import { UserData } from "../../utils/firebase/firebase.utils";
import {
  signInSuccess,
  signInFailed,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
} from "./user.action";


export type UserState = {
  readonly currentUser: (UserData & {id: string}) | null;
  readonly error: Error | null;
}

const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  error: null,
};

export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction): UserState => {
  // ** important: the dispatch we're using for context(useReducer) only applies to this specific Reducer(cartReducer in this case), but in case of redux this isn't true, so that's why for redux we dont throw an error as default, instead we return the state itself

  if(signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
    }
  }

  if(signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
    }
  }

  if(signOutFailed.match(action) || signUpFailed.match(action) || signInFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
    }
  }

  return state;

  // switch (action.type) {
  //   case USER_ACTIONS_TYPES.SIGN_IN_SUCCESS:
  //     return {
  //       ...state,
  //       currentUser: action.payload,
  //       isLoading: false,
  //     };
  //   case USER_ACTIONS_TYPES.SIGN_OUT_SUCCESS:
  //     return {
  //       ...state,
  //       currentUser: null,
  //     };
  //   case USER_ACTIONS_TYPES.SIGN_OUT_FAILED:
  //   case USER_ACTIONS_TYPES.SIGN_IN_FAILED:
  //   case USER_ACTIONS_TYPES.SIGN_UP_FAILED:
  //     return {
  //       ...state,
  //       error: action.payload,
  //       isLoading: false,
  //     };
  //   default:
  //     return state;
  // }
};
