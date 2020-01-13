import React from "react";
import { withRouter } from "react-router-dom";

import styles from "./AccountCard.module.scss";

function AccountCard({ data, statuses, currencies, history, location }) {
  const { name, currencyId, statusId, value } = data;
  const currency =
    currencies.find(currency => currency.id === currencyId) || {};
  const status = statuses.find(status => status.id === statusId) || {};

  const handleCardClick = () => {
    return history.push(`${location.pathname}/${data.id}`);
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12" onClick={handleCardClick}>
      <div className={styles.accounts__card}>
        <div className={styles["accounts__card-title"]}>{name}</div>
        <div>
          <span className={styles["accounts__card-value"]}>{value}</span>
          <span className={styles["accounts__card-currency"]}>
            {currency.isoCode}
          </span>
        </div>
        <div className={styles["accounts__card-status"]}>{status.value}</div>
      </div>
    </div>
  );
}

export default withRouter(AccountCard);
