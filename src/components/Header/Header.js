import React from "react";
import classNames from "classnames";

import styles from "./Header.module.scss";

function Header() {
  return (
    <div className={classNames("d-flex", "flex-row-reverse", "p-3")}>
      <div
        className={styles.header__user}
        style={{ backgroundImage: "url('/')" }}
      />
    </div>
  );
}

export default Header;
