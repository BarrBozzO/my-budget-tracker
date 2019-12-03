import {
  CURRENCIES_FETCH_DONE,
  CURRENCIES_FETCH_PENDING,
  CURRENCIES_FETCH_ERROR
} from "../actions/types";

const initialState = {
  data: [],
  error: null,
  loading: true
};

const currenciesReducer = function(state = initialState, action) {
  switch (action.type) {
    case CURRENCIES_FETCH_DONE:
      return {
        error: null,
        data: action.payload.currencies,
        loading: false
      };
    case CURRENCIES_FETCH_PENDING:
      return {
        ...state,
        loading: true
      };
    case CURRENCIES_FETCH_ERROR:
      return {
        data: [],
        error: action.payload.error,
        loading: false
      };
    default:
      return state;
  }
};

export default currenciesReducer;
