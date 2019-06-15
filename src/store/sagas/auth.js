import { put, takeLeading, call } from "redux-saga/effects";

import {
  AUTH_SIGN_IN_WITH_GOOGLE_ASYNC,
  AUTH_SIGN_IN_WITH_GOOGLE_ERROR,
  AUTH_SIGN_IN_WITH_GOOGLE_SUCCESS
} from "../actions/types";
import Firebase from "../../firebase";

export function* SignInWithGoogleAsync() {
  let response = yield call(Firebase.signInWithGoogle);

  if (response.user) {
    yield put({
      type: AUTH_SIGN_IN_WITH_GOOGLE_SUCCESS,
      payload: {
        user: response.user
      }
    });
  } else {
    yield put({ type: AUTH_SIGN_IN_WITH_GOOGLE_ERROR });
  }
}

export function* watchSignInWithGoogleAsync() {
  yield takeLeading(AUTH_SIGN_IN_WITH_GOOGLE_ASYNC, SignInWithGoogleAsync);
}
