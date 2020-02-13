import { put, takeLatest, call } from "redux-saga/effects";

import {
  TRANSACTION_CREDIT_START,
  TRANSACTION_CREDIT_DONE,
  TRANSACTION_CREDIT_ERROR,
  TRANSACTION_CREDIT_PENDING,
  TRANSACTION_DEBIT_START,
  TRANSACTION_DEBIT_DONE,
  TRANSACTION_DEBIT_ERROR,
  TRANSACTION_DEBIT_PENDING
} from "../actions/types";
import Firebase from "../../firebase";

function* creditStart(action) {
  const { payload, meta } = action;
  const { resolve, reject } = meta || {};

  yield put({ type: TRANSACTION_CREDIT_PENDING });

  const { id, error } = yield call(
    Firebase.creditTransaction,
    payload.transaction
  );

  if (error) {
    yield put({ type: TRANSACTION_CREDIT_ERROR, error });
    if (reject) reject(error);
  } else {
    yield put({
      type: TRANSACTION_CREDIT_DONE,
      payload: { transaction: payload.transaction }
    });
    if (resolve) resolve({ id });
  }
}

function* debitStart(action) {
  const { payload, meta } = action;
  const { resolve, reject } = meta || {};

  yield put({ type: TRANSACTION_DEBIT_PENDING });

  const { id, error } = yield call(
    Firebase.debitTransaction,
    payload.transaction
  );

  if (error) {
    yield put({ type: TRANSACTION_DEBIT_ERROR, error });
    if (reject) reject(error);
  } else {
    yield put({
      type: TRANSACTION_DEBIT_DONE,
      payload: { transaction: payload.transaction }
    });
    if (resolve) resolve({ id });
  }
}

export function* watchCreditStart() {
  yield takeLatest(TRANSACTION_CREDIT_START, creditStart);
}

export function* watchDebitStart() {
  yield takeLatest(TRANSACTION_DEBIT_START, debitStart);
}

export default [watchCreditStart(), watchDebitStart()];
