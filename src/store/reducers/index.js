import { combineReducers } from "redux";

import authReducer from "./auth";
import accountsReducer from "./accounts";
import accountReducer from "./account";
import statusesReducer from "./statuses";
import currenciesReducer from "./currencies";
import modalReducer from "./modal";
import transactionsReducer from "./transactions";
import transactionReducer from "./transaction";

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  accounts: accountsReducer,
  transactions: transactionsReducer,
  transaction: transactionReducer,
  statuses: statusesReducer,
  currencies: currenciesReducer,
  modal: modalReducer
});

export default rootReducer;
