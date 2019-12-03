import { ACCOUNTS_WATCH_UPDATE, ACCOUNTS_WATCH_ERROR } from "../actions/types";

const initialState = {
  data: [],
  loading: true
};

const accountsReducer = function(state = initialState, action) {
  switch (action.type) {
    case ACCOUNTS_WATCH_UPDATE: {
      const nextData = [
        ...state.data.filter(
          account =>
            !action.payload.accounts.find(
              updatedAccout => account.id === updatedAccout.id
            )
        ),
        ...action.payload.accounts
      ];

      return {
        data: nextData,
        loading: false
      };
    }
    case ACCOUNTS_WATCH_ERROR:
      return {
        data: [],
        error: action.payload.error,
        loading: false
      };
    default:
      return state;
  }
};

export default accountsReducer;
