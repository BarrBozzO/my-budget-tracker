import { openModal } from "store/actions/modal";

export default function(store) {
  return function(name = "", data = {}) {
    return new Promise((resolve, reject) => {
      store.dispatch(openModal(name, data));
    });
  };
}
