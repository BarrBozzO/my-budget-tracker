import React from "react";
import { connect } from "react-redux";

import { signOut } from "../../store/actions/auth";
import Content from "./Content";

function ContentContainer(props) {
  return <Content handleSignOut={props.signOut} />;
}

const mapStateTopProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  signOut
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(ContentContainer);
