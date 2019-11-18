import { combineReducers } from "redux";

import authReducer from "./auth";
import accountsReducer from "./accounts";
import statusesReducer from "./statuses";
import currenciesReducer from "./currencies";
import modalReducer from "./modal";

const rootReducer = combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
  statuses: statusesReducer,
  currencies: currenciesReducer,
  modal: modalReducer
});

export default rootReducer;
