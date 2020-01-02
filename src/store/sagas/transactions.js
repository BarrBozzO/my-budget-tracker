import { put, takeLatest, call } from "redux-saga/effects";

import {
  TRANSACTION_CREDIT_START,
  TRANSACTION_CREDIT_DONE,
  TRANSACTION_CREDIT_ERROR,
  TRANSACTION_DEBIT_START,
  TRANSACTION_DEBIT_DONE,
  TRANSACTION_DEBIT_ERROR,
  TRANSACTIONS_FETCH_START,
  TRANSACTIONS_FETCH_DONE,
  TRANSACTIONS_FETCH_ERROR,
  TRANSACTIONS_FETCH_PENDING
} from "../actions/types";
import Firebase from "../../firebase";

function* creditStart(action) {
  const { id, error } = yield call(
    Firebase.creditTransaction,
    action.payload.transaction
  );

  if (error) yield put({ type: TRANSACTION_CREDIT_ERROR, error });
  else {
    yield put({
      type: TRANSACTION_CREDIT_DONE,
      payload: { transaction: action.payload.transaction }
    });
  }
}

function* debitStart(action) {
  const { id, error } = yield call(
    Firebase.debitTransaction,
    action.payload.transaction
  );

  if (error) yield put({ type: TRANSACTION_DEBIT_ERROR, error });
  else {
    yield put({
      type: TRANSACTION_DEBIT_DONE,
      payload: { transaction: action.payload.transaction }
    });
  }
}

function* fetchTransactions() {
  yield put({ type: TRANSACTIONS_FETCH_PENDING });
  let response = yield call(Firebase.getTransactions);

  if (response.error) {
    yield put({ type: TRANSACTIONS_FETCH_ERROR, error: response.error });
  } else {
    yield put({
      type: TRANSACTIONS_FETCH_DONE,
      payload: { transactions: response.data }
    });
  }
}

export function* watchCreditStart() {
  yield takeLatest(TRANSACTION_CREDIT_START, creditStart);
}

export function* watchDebitStart() {
  yield takeLatest(TRANSACTION_DEBIT_START, debitStart);
}

export function* watchTransactionsFetch() {
  yield takeLatest(TRANSACTIONS_FETCH_START, fetchTransactions);
}

export default [
  watchCreditStart(),
  watchCreditStart(),
  watchTransactionsFetch()
];
