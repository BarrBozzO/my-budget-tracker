import {
  STATUSES_FETCH_DONE,
  STATUSES_FETCH_PENDING,
  STATUSES_FETCH_ERROR
} from "../actions/types";

const initialState = {
  data: [],
  error: null,
  loading: true
};

const statusesReducer = function(state = initialState, action) {
  switch (action.type) {
    case STATUSES_FETCH_DONE:
      return {
        error: null,
        data: action.payload.statuses,
        loading: false
      };
    case STATUSES_FETCH_PENDING:
      return {
        ...state,
        loading: true
      };
    case STATUSES_FETCH_ERROR:
      return {
        data: [],
        error: action.payload.error,
        loading: false
      };
    default:
      return state;
  }
};

export default statusesReducer;
