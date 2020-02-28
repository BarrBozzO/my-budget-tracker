import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { Button, Icon } from "components";

import styles from "./Header.module.scss";

function Header(props) {
  return (
    <div
      className={classNames(
        "d-flex",
        "flex-row-reverse",
        "align-items-center",
        "p-3"
      )}
    >
      <div className={styles.header__user}>
        <Icon
          className={styles["header__user-avatar"]}
          name="user-avatar-placeholder"
        />
      </div>
      <div className={styles["header__button-container"]}>
        <Button
          variant="link"
          onClick={props.handleSignOut}
          className={styles.header__button}
          flat
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

Header.propTypes = {
  handleSignOut: PropTypes.func.isRequired
};

export default Header;
