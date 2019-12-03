import { eventChannel } from "redux-saga";
import { put, takeLeading, call, take } from "redux-saga/effects";

import {
  AUTH_SIGN_IN_WITH_GOOGLE_START,
  AUTH_SIGN_IN_ERROR,
  AUTH_SIGN_IN_DONE,
  AUTH_SIGN_OUT_DONE,
  AUTH_SIGN_OUT_START,
  AUTH_SIGN_OUT_ERROR
} from "../actions/types";
import Firebase from "../../firebase";

function createAuthChannel() {
  return eventChannel(emitter => {
    const unsubscribe = Firebase.getAuthStateListener(user => {
      if (user) {
        emitter({ user });
      } else {
        emitter({ user: null });
      }
    });

    return unsubscribe;
  });
}

export function* watchAuthStateChange() {
  const authStateChannel = yield call(createAuthChannel);
  try {
    while (true) {
      const { user } = yield take(authStateChannel);
      if (user) {
        yield put({ type: AUTH_SIGN_IN_DONE, payload: { user } });
      } else {
        yield put({ type: AUTH_SIGN_OUT_DONE });
      }
    }
  } finally {
    // AuthStateObserver shouldn't terminate
  }
}

function* SignInWithGoogleAsync() {
  let response = yield call(Firebase.signInWithGoogle);

  if (response.error) {
    yield put({ type: AUTH_SIGN_IN_ERROR });
  }
}

function* SignOutAsync() {
  let response = yield call(Firebase.signOut);

  if (response.error) {
    yield put({ type: AUTH_SIGN_OUT_ERROR });
  }
}

export function* watchSignInWithGoogleAsync() {
  yield takeLeading(AUTH_SIGN_IN_WITH_GOOGLE_START, SignInWithGoogleAsync);
}

export function* watchSignOut() {
  yield takeLeading(AUTH_SIGN_OUT_START, SignOutAsync);
}
