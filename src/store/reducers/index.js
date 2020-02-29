import { combineReducers } from "redux";
import { AUTH_SIGN_OUT_DONE } from "../actions/types";

import authReducer from "./auth";
import accountsReducer from "./accounts";
import accountReducer from "./account";
import statusesReducer from "./statuses";
import currenciesReducer from "./currencies";
import modalReducer from "./modal";
import transactionsReducer from "./transactions";
import transactionReducer from "./transaction";

const appReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  accounts: accountsReducer,
  transactions: transactionsReducer,
  transaction: transactionReducer,
  statuses: statusesReducer,
  currencies: currenciesReducer,
  modal: modalReducer
});

const rootReducer = (state, action) => {
  if (action.type === AUTH_SIGN_OUT_DONE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
