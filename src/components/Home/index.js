import React from "react";
import classNames from "classnames";

import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={classNames("container-fluid", styles.home)}>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className={styles.home__card}>
            <div className={styles["home__card-title"]}>Total</div>
            <div className={styles["home__card-content"]}>
              <div className={styles["home__card-sum"]}>
                {"12512.21"}
                <span className={styles["home__card-sum-currency"]}>₽</span>
              </div>
              <div className={styles["home__card-sum"]}>
                {"12.27"}
                <span className={styles["home__card-sum-currency"]}>$</span>
              </div>
              <div className={styles["home__card-sum"]}>
                {"678.00"}
                <span className={styles["home__card-sum-currency"]}>€</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className={styles.home__card}>
            <div className={styles["home__card-title"]}>Accounts</div>
            <div className={styles["home__card-content"]}>
              <div>All - 4</div>
              <div>Available - 2</div>
              <div>Blocked - 1</div>
              <div>Closed - 1</div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className={styles.home__card}>
            <div className={styles["home__card-title"]}>Goals</div>
            <div>Unavailable</div>
          </div>
        </div>
      </div>
    </div>
  );
}
