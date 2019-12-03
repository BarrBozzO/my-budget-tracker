import { eventChannel } from "redux-saga";
import { put, call, take, cancel, fork } from "redux-saga/effects";

import {
  ACCOUNTS_WATCH_UPDATE,
  ACCOUNTS_WATCH_ERROR,
  ACCOUNTS_WATCH_START,
  ACCOUNTS_WATCH_STOP
} from "../actions/types";
import Firebase from "../../firebase";

function createAccountsChannel() {
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

function* watchAccounts() {
  const accountsChannel = yield call(createAccountsChannel);
  try {
    while (true) {
      const { accounts } = yield take(accountsChannel);
      if (Array.isArray(accounts)) {
        debugger;
        yield put({ type: ACCOUNTS_WATCH_UPDATE, payload: { accounts } });
      } else {
        yield put({ type: ACCOUNTS_WATCH_ERROR });
      }
    }
  } finally {
    accountsChannel.close();
  }
}

export function* main() {
  while (yield take(ACCOUNTS_WATCH_START)) {
    const accountsSync = yield fork(watchAccounts);

    yield take(ACCOUNTS_WATCH_STOP);

    yield cancel(accountsSync);
  }
}
