import {
  TRANSACTION_CREDIT_PENDING,
  TRANSACTION_DEBIT_PENDING,
  TRANSACTION_CREDIT_DONE,
  TRANSACTION_DEBIT_DONE,
  TRANSACTION_CREDIT_ERROR,
  TRANSACTION_DEBIT_ERROR
} from "../actions/types";

const initialState = {
  data: [],
  error: null,
  loading: true
};

const transactionReducer = function(state = initialState, action) {
  switch (action.type) {
    case TRANSACTION_CREDIT_DONE:
    case TRANSACTION_DEBIT_DONE:
      return {
        error: null,
        data: action.payload.transaction,
        loading: false
      };
    case TRANSACTION_CREDIT_PENDING:
    case TRANSACTION_DEBIT_PENDING:
      return {
        data: [],
        error: null,
        loading: true
      };
    case TRANSACTION_CREDIT_ERROR:
    case TRANSACTION_DEBIT_ERROR:
      return {
        data: [],
        error: action.payload.error,
        loading: false
      };
    default:
      return state;
  }
};

export default transactionReducer;
