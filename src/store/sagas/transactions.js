import { put, takeLatest, call } from "redux-saga/effects";

import {
  TRANSACTIONS_FETCH_START,
  TRANSACTIONS_FETCH_DONE,
  TRANSACTIONS_FETCH_ERROR,
  TRANSACTIONS_FETCH_PENDING
} from "../actions/types";
import Firebase from "../../firebase";

function* fetchTransactions(action) {
  yield put({ type: TRANSACTIONS_FETCH_PENDING });
  let response = yield call(Firebase.getTransactions, {
    accountId: action.payload.accountId
  });

  if (response.error) {
    yield put({ type: TRANSACTIONS_FETCH_ERROR, error: response.error });
  } else {
    yield put({
      type: TRANSACTIONS_FETCH_DONE,
      payload: { transactions: response.data }
    });
  }
}

export function* watchTransactionsFetch() {
  yield takeLatest(TRANSACTIONS_FETCH_START, fetchTransactions);
}

export default [watchTransactionsFetch()];
