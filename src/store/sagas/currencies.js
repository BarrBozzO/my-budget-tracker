import { takeLatest, call, put } from "redux-saga/effects";

import Firebase from "../../firebase";

import {
  CURRENCIES_FETCH_DONE,
  CURRENCIES_FETCH_START,
  CURRENCIES_FETCH_ERROR,
  CURRENCIES_FETCH_PENDING
} from "../actions/types";

function* fetchCurrencies() {
  yield put({ type: CURRENCIES_FETCH_PENDING });
  let response = yield call(Firebase.getCurrencies);

  if (response.error) {
    yield put({ type: CURRENCIES_FETCH_ERROR, error: response.error });
  } else {
    yield put({
      type: CURRENCIES_FETCH_DONE,
      payload: { currencies: response.data }
    });
  }
}

export function* watchCurrenciesFetch() {
  yield takeLatest(CURRENCIES_FETCH_START, fetchCurrencies);
}
