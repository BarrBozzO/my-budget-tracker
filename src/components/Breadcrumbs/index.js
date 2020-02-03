import React from "react";
import cx from "classnames";
import { Link } from "react-router-dom";

import styles from "./Breadcrumbs.module.scss";

function Breadcrumbs({ path, className }) {
  const renderItem = ({ href, label }, isLast) => {
    return (
      <>
        {href ? <Link to={href}>{label}</Link> : <span>{label}</span>}
        {!isLast ? (
          <span className={styles["breadcrumbs__list-delimiter"]}>/</span>
        ) : (
          ""
        )}
      </>
    );
  };

  return (
    <div className={cx(styles["breadcrumbs"], className)}>
      <ul className={styles["breadcrumbs__list"]}>
        {path.map((item, index) => (
          <li className={styles["breadcrumbs__list-item"]}>
            {renderItem(item, path.length === index + 1)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Breadcrumbs;
