import { MODAL_CLOSE, MODAL_OPEN } from "../actions/types";

const initialState = {
  name: null
};

const modalReducer = function(state = initialState, action) {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        name: action.payload.name,
        data: action.payload.data
      };
    case MODAL_CLOSE:
      return {
        name: null
      };
    default:
      return state;
  }
};

export default modalReducer;
