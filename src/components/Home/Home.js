import React from "react";
import classNames from "classnames";

import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={classNames("container", styles.home)}>
      <div className="row">
        <div className="col-lg">
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
        <div className="col-lg">
          <div className={styles.home__card}>
            <div className={styles["home__card-title"]}>Accounts</div>
          </div>
        </div>
        <div className="col-lg">
          <div className={styles.home__card}>
            <div className={styles["home__card-title"]}>Others</div>
          </div>
        </div>
      </div>
    </div>
  );
}
