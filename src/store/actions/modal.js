import { MODAL_CLOSE, MODAL_OPEN } from "./types";

export function openModal(name, data = {}) {
  return {
    type: MODAL_OPEN,
    payload: {
      name,
      data
    }
  };
}

export function closeModal() {
  return {
    type: MODAL_CLOSE
  };
}
