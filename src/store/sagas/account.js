import { put, take, takeLatest, call } from "redux-saga/effects";

import {
  ACCOUNT_FETCH_START,
  ACCOUNT_FETCH_ERROR,
  ACCOUNT_FETCH_DONE,
  ACCOUNTS_ADD_START,
  ACCOUNTS_ADD_ERROR,
  ACCOUNTS_ADD_DONE,
  ACCOUNTS_UPDATE_DONE,
  ACCOUNTS_UPDATE_START,
  ACCOUNTS_UPDATE_ERROR
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

function* addAccountAsync(action) {
  const { id, error } = yield call(Firebase.addAccount, action.payload.account);

  if (error) yield put({ type: ACCOUNTS_ADD_ERROR, error });
  else {
    yield put({
      type: ACCOUNTS_ADD_DONE,
      payload: { account: action.payload.account }
    });
  }
}

export function* watchAddAccountAsync() {
  yield takeLatest(ACCOUNTS_ADD_START, addAccountAsync);
}

function* updateAccountAsync(action) {
  const { id, error } = yield call(
    Firebase.updateAccount,
    action.payload.account
  );

  if (error) yield put({ type: ACCOUNTS_UPDATE_ERROR, error });
  else
    yield put({
      type: ACCOUNTS_UPDATE_DONE,
      payload: { account: action.payload.account }
    });
}

export function* watchUpdateAccountAsync() {
  yield takeLatest(ACCOUNTS_UPDATE_START, updateAccountAsync);
}
