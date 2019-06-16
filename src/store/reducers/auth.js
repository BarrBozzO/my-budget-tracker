import {
  AUTH_SIGN_IN_ERROR,
  AUTH_SIGN_IN_DONE,
  AUTH_SIGN_OUT_DONE
} from "../actions/types";

const initialState = {
  user: null,
  isAuthenticated: false
};

const authReducer = function(state = initialState, action) {
  switch (action.type) {
    case AUTH_SIGN_IN_DONE:
      return {
        user: action.payload.user,
        isAuthenticated: true
      };
    case AUTH_SIGN_IN_ERROR:
    case AUTH_SIGN_OUT_DONE:
      return {
        user: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default authReducer;
