import React, { useRef } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withActions } from "actions";
import LoadingBar from "react-top-loading-bar";

import ModalWrapper from "./ModalWrapper";

import accountModal from "./accountModal";
import transactionModal from "./transactionModal";

const modalContents = {
  accountModal,
  transactionModal
};

function ModalLayout({ modal = {}, actions }) {
  let loadingRef = useRef(null);

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

    const handleLoading = (loading = false) => {
      if (!loadingRef.current) return;

      return loading
        ? loadingRef.current.continuousStart()
        : loadingRef.current.complete();
    };

    return content ? (
      <ModalWrapper
        handleClose={handleClose}
        handleReject={handleReject}
        content={content}
        data={modal.data}
        handleLoading={handleLoading}
      />
    ) : null;
  };

  return (
    <div className="modals-layout">
      <LoadingBar
        height={3}
        color="#f11946"
        onRef={ref => (loadingRef.current = ref)}
      />
      {renderModal()}
    </div>
  );
}

const mapStateToProps = state => ({
  modal: state.modal
});

export default compose(withActions, connect(mapStateToProps))(ModalLayout);
