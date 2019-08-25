import React from "react";
import { connect } from "react-redux";

import { signOut } from "../../store/actions/auth";
import { getAccount } from "../../store/actions/account";
import Content from "./Content";

function ContentContainer(props) {
  return (
    <Content
      handleSignOut={props.signOut}
      handleGetAccount={props.getAccount}
    />
  );
}

const mapStateTopProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  signOut,
  getAccount
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(ContentContainer);
