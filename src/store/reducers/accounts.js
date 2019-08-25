import { ACCOUNTS_FETCH_DONE } from "../actions/types";

const initialState = {
  accounts: [],
  loading: true
};

const accountsReducer = function(state = initialState, action) {
  switch (action.type) {
    case ACCOUNTS_FETCH_DONE:
      return {
        accounts: action.payload.accounts,
        loading: false
      };
    default:
      return state;
  }
};

export default accountsReducer;
