import React from "react";
import { connect } from "react-redux";

import { closeModal } from "../store/actions/modal";

import ModalWrapper from "./ModalWrapper";

import accountModal from "./accountModal";

const modalContents = {
  accountModal
};

function ModalsLayout({ modal = {}, closeModal }) {
  const renderModal = () => {
    const name = modal.name || "";
    const content = name in modalContents ? modalContents[name] : null;

    return content ? (
      <ModalWrapper
        handleClose={() => closeModal()}
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

const mapDispatchToProps = {
  closeModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalsLayout);
