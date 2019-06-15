import { all } from "redux-saga/effects";

import { watchSignInWithGoogleAsync } from "./auth";

export default function* rootSaga() {
  yield all([watchSignInWithGoogleAsync()]);
}
