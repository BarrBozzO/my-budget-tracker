import { MODAL_CLOSE, MODAL_OPEN } from "./types";

export function openModal(id, name, data = {}) {
  return {
    type: MODAL_OPEN,
    payload: {
      id,
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
