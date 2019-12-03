import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { signInWithGoogleAsync } from "store/actions/auth";
import Welcome from "./Welcome";

function WelcomeContainer(props) {
  const { isAuthenticated } = props.auth;

  return isAuthenticated ? (
    <Redirect to="/dashboard" />
  ) : (
    <Welcome handleSignIn={props.signInWithGoogleAsync} />
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  signInWithGoogleAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer);
