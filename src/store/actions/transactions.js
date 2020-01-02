import {
  TRANSACTION_CREDIT_START,
  TRANSACTION_DEBIT_START,
  TRANSACTIONS_FETCH_START
} from "./types";

export function transactionCredit(transaction) {
  return {
    type: TRANSACTION_CREDIT_START,
    payload: {
      transaction
    }
  };
}

export function transactionDebit(transaction) {
  return {
    type: TRANSACTION_DEBIT_START,
    payload: {
      transaction
    }
  };
}

export const getTransactions = accountId => {
  return {
    type: TRANSACTIONS_FETCH_START,
    payload: {
      accountId
    }
  };
};
