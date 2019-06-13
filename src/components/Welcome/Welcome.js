import React from "react";
import classNames from "classnames";
import { Button } from "react-bootstrap";

import styles from "./Welcome.module.scss";

function Welcome() {
  return (
    <div
      className={classNames(styles.welcome, "container-fluid", "text-center")}
    >
      <h1 className={classNames(styles.welcome__title)}>My Budget Tracker</h1>
      <span className={classNames(styles.welcome__message)}>
        Plan for today and tomorrow with one solution to manage all your
        finances.
      </span>
      <div className={"m-3"}>
        <Button className={classNames(styles.welcome__button, "mx-2")}>
          Sign In
        </Button>
        <Button className={classNames(styles.welcome__button, "mx-2")}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default Welcome;
