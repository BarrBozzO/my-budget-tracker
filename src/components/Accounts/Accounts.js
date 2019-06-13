import React from "react";
import classNames from "classnames";

import styles from "./Accounts.module.scss";

function Accounts() {
  return (
    <div className={classNames("container-fluid", styles.accounts)}>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className={styles.accounts__card}>
            <div className={styles["accounts__card-title"]}>Account name</div>
            <div className={styles["accounts__card-content"]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accounts;
