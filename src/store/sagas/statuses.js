import { takeLatest, call, put } from "redux-saga/effects";

import Firebase from "../../firebase";

import {
  STATUSES_FETCH_DONE,
  STATUSES_FETCH_START,
  STATUSES_FETCH_ERROR,
  STATUSES_FETCH_PENDING
} from "../actions/types";

function* fetchStatuses() {
  yield put({ type: STATUSES_FETCH_PENDING });
  let response = yield call(Firebase.getStatuses);

  if (response.error) {
    yield put({ type: STATUSES_FETCH_ERROR, error: response.error });
  } else {
    yield put({
      type: STATUSES_FETCH_DONE,
      payload: { statuses: response.data }
    });
  }
}

export function* watchStatusesFetch() {
  yield takeLatest(STATUSES_FETCH_START, fetchStatuses);
}
