import React from "react";
import cx from "classnames";
import Icon from "components/Icon";

import styles from "./Status.module.scss";

function Status({ icon, label, className, iconClassName }) {
  return (
    <div className={cx(className, styles["status"])}>
      <Icon name={icon} className={cx(iconClassName, styles["status__icon"])} />{" "}
      {label}
    </div>
  );
}

export default Status;
