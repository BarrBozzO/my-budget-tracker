import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withActions } from "actions";

import ModalWrapper from "./ModalWrapper";

import accountModal from "./accountModal";
import transactionModal from "./transactionModal";

const modalContents = {
  accountModal,
  transactionModal
};

function ModalLayout({ modal = {}, actions }) {
  const renderModal = () => {
    const name = modal.name || "";
    const id = modal.id;
    const content = name in modalContents ? modalContents[name] : null;

    const handleClose = (data = {}) => {
      actions.resolveModal(id, data);
    };

    const handleReject = (error = {}) => {
      actions.rejectModal(id, error);
    };

    return content ? (
      <ModalWrapper
        handleClose={handleClose}
        handleReject={handleReject}
        content={content}
        data={modal.data}
      />
    ) : null;
  };

  return <div className="modals-layout">{renderModal()}</div>;
}

const mapStateToProps = state => ({
  modal: state.modal
});

export default compose(withActions, connect(mapStateToProps))(ModalLayout);
