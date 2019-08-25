import { ACCOUNT_FETCH_START } from "./types.js";

export const getAccount = id => {
  return {
    type: ACCOUNT_FETCH_START,
    payload: {
      id
    }
  };
};
