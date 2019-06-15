import {
  AUTH_SIGN_IN_WITH_GOOGLE_ERROR,
  AUTH_SIGN_IN_WITH_GOOGLE_SUCCESS,
  AUTH_SIGN_OUT
} from "../actions/types";

const initialState = {
  user: null,
  isAuthenticated: false
};

const authReducer = function(state = initialState, action) {
  switch (action.type) {
    case AUTH_SIGN_IN_WITH_GOOGLE_SUCCESS:
      return {
        user: action.payload.user,
        isAuthenticated: true
      };
    case AUTH_SIGN_IN_WITH_GOOGLE_ERROR:
      return {
        user: null,
        isAuthenticated: false
      };
    case AUTH_SIGN_OUT:
      return {
        user: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default authReducer;
