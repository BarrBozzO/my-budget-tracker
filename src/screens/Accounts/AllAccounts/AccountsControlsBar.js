import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

import styles from "./Accounts.module.scss";

function AccountsControlsBar({ onCreate }) {
  return (
    <div className={styles["accounts__controls"]}>
      <Button
        className={styles["accounts__controls-create"]}
        onClick={onCreate}
      >
        create
      </Button>
    </div>
  );
}

AccountsControlsBar.propTypes = {
  onCreate: PropTypes.func.isRequired
};

export default AccountsControlsBar;
