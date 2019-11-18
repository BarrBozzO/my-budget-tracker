import { ACCOUNTS_WATCH_START, ACCOUNTS_WATCH_STOP } from "./types.js";

export const startAccountsWatch = () => {
  return {
    type: ACCOUNTS_WATCH_START
  };
};

export const stopAccountsWatch = () => {
  return {
    type: ACCOUNTS_WATCH_STOP
  };
};
