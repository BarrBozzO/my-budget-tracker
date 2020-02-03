import React, { useState } from "react";
import uuidv4 from "uuid/v4";

import { openModal, closeModal } from "store/actions/modal";

export const ActionsContext = React.createContext(null);

export function ActionsProvider({ store, children }) {
  const [modals, setModals] = useState([]);

  const showModal = () => (name = "", data = {}) => {
    const modalId = uuidv4();

    const promise = new Promise((resolve, reject) => {
      setModals([
        ...modals,
        {
          id: modalId,
          resolve,
          reject
        }
      ]);
    });

    store.dispatch(openModal(modalId, name, data));

    return promise;
  };

  const resolveModal = (id, data) => {
    const modalInfo = modals.find(modal => modal.id === id);

    if (!modalInfo) console.error("Modal not found");

    store.dispatch(closeModal());

    return modalInfo.resolve(data);
  };

  const rejectModal = (id, error) => {
    const modalInfo = modals.find(modal => modal.id === id);

    if (!modalInfo) console.error("Modal not found");

    store.dispatch(closeModal());

    return modalInfo.reject(error);
  };

  return (
    <ActionsContext.Provider
      value={{
        showModal: showModal(store),
        resolveModal,
        rejectModal
      }}
    >
      {children}
    </ActionsContext.Provider>
  );
}

export function withActions(Component) {
  return props => {
    return (
      <ActionsContext.Consumer>
        {context => {
          return <Component {...props} actions={context} />;
        }}
      </ActionsContext.Consumer>
    );
  };
}

// export const ActionsConsumer = useContext(ActionsProvider.Consumer);
