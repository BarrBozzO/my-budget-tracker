import { ACCOUNTS_WATCH_UPDATE, ACCOUNTS_WATCH_ERROR } from "../actions/types";

const initialState = {
  data: [],
  loading: true
};

const accountsReducer = function(state = initialState, action) {
  switch (action.type) {
    case ACCOUNTS_WATCH_UPDATE: {
      const removed = [],
        updatedOrAdded = [];

      action.payload.accounts.forEach(account => {
        const {
          metadata: { type }
        } = account;

        switch (type) {
          case "removed":
            removed.push(account);
            break;
          case "modified":
          case "added":
            updatedOrAdded.push(account);
            break;
        }
      });

      const nextData = [
        ...state.data.filter(
          account => !action.payload.accounts.find(a => account.id === a.id)
        ),
        ...updatedOrAdded
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
