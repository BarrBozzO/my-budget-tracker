import { all } from "redux-saga/effects";

import {
  watchSignInWithGoogleAsync,
  watchAuthStateChange,
  watchSignOut
} from "./auth";
import { watchAccountsChanged } from "./accounts";
import { watchFetchAccountAsync } from "./account";

export default function* rootSaga() {
  yield all([
    watchAccountsChanged(),
    watchSignInWithGoogleAsync(),
    watchAuthStateChange(),
    watchSignOut(),
    watchFetchAccountAsync()
  ]);
}
