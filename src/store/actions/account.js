import {
  ACCOUNT_FETCH_START,
  ACCOUNTS_ADD_START,
  ACCOUNTS_UPDATE_START
} from "./types.js";

export const getAccount = id => {
  return {
    type: ACCOUNT_FETCH_START,
    payload: {
      id
    }
  };
};

export const addAccount = account => {
  return {
    type: ACCOUNTS_ADD_START,
    payload: {
      account
    }
  };
};

export const updateAccount = account => {
  return {
    type: ACCOUNTS_UPDATE_START,
    payload: {
      account
    }
  };
};
