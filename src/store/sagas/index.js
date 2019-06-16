import { all } from "redux-saga/effects";

import {
  watchSignInWithGoogleAsync,
  watchAuthStateChange,
  watchSignOut
} from "./auth";

export default function* rootSaga() {
  yield all([
    watchSignInWithGoogleAsync(),
    watchAuthStateChange(),
    watchSignOut()
  ]);
}
