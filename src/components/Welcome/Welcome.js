import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import { signInWithGoogleAsync } from "../../store/actions/auth";
import styles from "./Welcome.module.scss";

function Welcome(props) {
  const { isAuthenticated } = props.auth;
  return isAuthenticated ? (
    <Redirect to="/dashboard" />
  ) : (
    <div
      className={classNames(styles.welcome, "container-fluid", "text-center")}
    >
      <h1 className={classNames(styles.welcome__title)}>My Budget Tracker</h1>
      <span className={classNames(styles.welcome__message)}>
        Plan for today and tomorrow with one solution to manage all your
        finances.
      </span>
      <div className={"m-3"}>
        <Button
          className={classNames(styles.welcome__button, "mx-2")}
          onClick={() => props.signInWithGoogleAsync()}
        >
          Sign In
        </Button>
        {/* <Button className={classNames(styles.welcome__button, "mx-2")}>
          Sign Up
        </Button> */}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  signInWithGoogleAsync
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
