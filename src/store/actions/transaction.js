import { createPromiseAction } from "store/helpers";
import { TRANSACTION_CREDIT_START, TRANSACTION_DEBIT_START } from "./types";

export function transactionCredit(transaction) {
  return createPromiseAction({
    type: TRANSACTION_CREDIT_START,
    payload: {
      transaction
    }
  });
}

export function transactionDebit(transaction) {
  return createPromiseAction({
    type: TRANSACTION_DEBIT_START,
    payload: {
      transaction
    }
  });
}
