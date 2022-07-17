import { USER_ACTIONS_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  // ** important: the dispatch we're using for context(useReducer) only applies to this specific Reducer(cartReducer in this case), but in case of redux this isn't true, so that's why for redux we dont throw an error as default, instead we return the state itself
  const { type, payload } = action;

  switch (type) {
    case USER_ACTIONS_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};
