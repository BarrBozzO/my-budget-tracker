import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import Icon from "components/Icon";
import { Button } from "react-bootstrap";

import styles from "./Header.module.scss";

function Header(props) {
  return (
    <div
      className={cx("d-flex", "flex-row-reverse", "align-items-center", "p-3")}
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
