import { TRANSACTIONS_FETCH_START } from "./types";

export const getTransactions = accountId => {
  return {
    type: TRANSACTIONS_FETCH_START,
    payload: {
      accountId
    }
  };
};
