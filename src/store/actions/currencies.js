import { CURRENCIES_FETCH_START } from "./types.js";

export const getCurrencies = () => {
  return {
    type: CURRENCIES_FETCH_START
  };
};
