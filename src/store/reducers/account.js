import {
  ACCOUNT_FETCH_DONE,
  ACCOUNT_FETCH_ERROR,
  ACCOUNT_FETCH_PENDING
} from "../actions/types";

const initialState = {
  data: null,
  error: null,
  loading: true
};

const accountReducer = function(state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_FETCH_DONE:
      return {
        error: null,
        data: action.payload.account,
        loading: false
      };
    case ACCOUNT_FETCH_PENDING:
      return {
        ...state,
        loading: true
      };
    case ACCOUNT_FETCH_ERROR:
      return {
        data: null,
        error: action.payload.error,
        loading: false
      };
    default:
      return state;
  }
};

export default accountReducer;
