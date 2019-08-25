import { eventChannel } from "redux-saga";
import { put, takeLeading, call, take } from "redux-saga/effects";

import {
  ACCOUNTS_ADD_DONE,
  ACCOUNTS_ADD_ERROR,
  ACCOUNTS_ADD_START,
  ACCOUNTS_FETCH_DONE,
  ACCOUNTS_FETCH_ERROR
} from "../actions/types";
import Firebase from "../../firebase";

function accountsChanged() {
  return eventChannel(emitter => {
    const unsubscribe = Firebase.getAccountsListener(changedAccounts => {
      if (changedAccounts) {
        emitter({ accounts: changedAccounts });
      } else {
        emitter({ accounts: [] });
      }
    });

    return unsubscribe;
  });
}

export function* watchAccountsChanged() {
  const accountsChangedChannel = yield call(accountsChanged);
  try {
    while (true) {
      const { accounts } = yield take(accountsChangedChannel);
      if (Array.isArray(accounts)) {
        yield put({ type: ACCOUNTS_FETCH_DONE, payload: { accounts } });
      } else {
        yield put({ type: ACCOUNTS_FETCH_ERROR });
      }
    }
  } finally {
    // AuthStateObserver shouldn't terminate
  }
}

function* AddAccountAsync() {
  let response = yield call(Firebase.addAccount, { name: "test" });

  if (response.account) {
    yield put({ type: ACCOUNTS_ADD_DONE });
  } else {
    yield put({ type: ACCOUNTS_ADD_ERROR });
  }
}

export function* watchAddAccountAsync() {
  yield takeLeading(ACCOUNTS_ADD_START, AddAccountAsync);
}
