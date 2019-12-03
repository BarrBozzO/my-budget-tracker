import { STATUSES_FETCH_START } from "./types.js";

export const getStatuses = () => {
  return {
    type: STATUSES_FETCH_START
  };
};
