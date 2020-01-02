import {
  TRANSACTIONS_FETCH_DONE,
  TRANSACTIONS_FETCH_PENDING,
  TRANSACTIONS_FETCH_ERROR
} from "../actions/types";

const initialState = {
  data: [],
  error: null,
  loading: true
};

const transactionsReducer = function(state = initialState, action) {
  switch (action.type) {
    case TRANSACTIONS_FETCH_DONE:
      return {
        error: null,
        data: action.payload.transactions,
        loading: false
      };
    case TRANSACTIONS_FETCH_PENDING:
      return {
        ...state,
        loading: true
      };
    case TRANSACTIONS_FETCH_ERROR:
      return {
        data: [],
        error: action.payload.error,
        loading: false
      };
    default:
      return state;
  }
};

export default transactionsReducer;
