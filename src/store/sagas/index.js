import { all } from "redux-saga/effects";

import {
  watchSignInWithGoogleAsync,
  watchAuthStateChange,
  watchSignOut
} from "./auth";
import { main as accountsSaga } from "./accounts";
import {
  watchFetchAccountAsync,
  watchAddAccountAsync,
  watchUpdateAccountAsync
} from "./account";
import { watchCurrenciesFetch } from "./currencies";
import { watchStatusesFetch } from "./statuses";
import transactions from "./transactions";
import transaction from "./transaction";

export default function* rootSaga() {
  yield all([
    accountsSaga(),
    watchSignInWithGoogleAsync(),
    watchAuthStateChange(),
    watchAddAccountAsync(),
    watchUpdateAccountAsync(),
    watchSignOut(),
    watchFetchAccountAsync(),
    watchCurrenciesFetch(),
    watchStatusesFetch(),
    ...transactions,
    ...transaction
  ]);
}
