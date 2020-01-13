import React from "react";
import { Modal } from "react-bootstrap";

function ModalWrapper({ content, data, handleClose }) {
  const ModalContent = content;

  return (
    <Modal show onHide={() => handleClose()}>
      <ModalContent handleClose={() => handleClose()} data={data} />
    </Modal>
  );
}

export default ModalWrapper;
