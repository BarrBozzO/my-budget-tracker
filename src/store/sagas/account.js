import { put, take, takeLatest, call } from "redux-saga/effects";

import {
  ACCOUNT_FETCH_START,
  ACCOUNT_FETCH_ERROR,
  ACCOUNT_FETCH_DONE
} from "../actions/types";
import Firebase from "../../firebase";

function* fetchAccountAsync(action) {
  const { account, error } = yield call(Firebase.getAccount, action.payload.id);

  if (error) yield put({ type: ACCOUNT_FETCH_ERROR, error });
  else yield put({ type: ACCOUNT_FETCH_DONE, payload: { account } });
}

export function* watchFetchAccountAsync() {
  yield takeLatest(ACCOUNT_FETCH_START, fetchAccountAsync);
}
