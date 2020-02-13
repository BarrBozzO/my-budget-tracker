import React from "react";
import { Modal } from "react-bootstrap";

function ModalWrapper({ content, data, handleClose, handleLoading }) {
  const ModalContent = content;

  return (
    <Modal show onHide={() => handleClose()}>
      <ModalContent
        handleClose={handleClose}
        handleLoading={handleLoading}
        data={data}
      />
    </Modal>
  );
}

export default ModalWrapper;
