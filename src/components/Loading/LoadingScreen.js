import React from "react";

import styles from "./Loading.module.scss";

function LoadingScreen(props) {
  return <div className={styles["loading__screen"]}>{props.children}</div>;
}

export default LoadingScreen;
