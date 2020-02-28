import React from "react";
import { withRouter } from "react-router-dom";
import Status from "components/Status";
import cx from "classnames";
import { accountStatuses as ACCOUNT_STATUSES } from "constants";
import { formatNumber } from "utils";

import styles from "./AccountCard.module.scss";

function AccountCard({ data, statuses, currencies, history, location }) {
  const { name = "", currencyId, statusId, value = 0 } = data;
  const currency =
    currencies.find(currency => currency.id === currencyId) || {};
  const status = statuses.find(status => status.id === statusId) || {};

  const handleCardClick = () => {
    return history.push(`${location.pathname}/${data.id}`);
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12" onClick={handleCardClick}>
      <div className={styles.accounts__card}>
        <div className={styles["accounts__card-row"]}>
          <div className={styles["accounts__card-title"]}>{name}</div>
          <Status
            icon={
              (ACCOUNT_STATUSES.find(s => s.key === status.value) || {})["icon"]
            }
            label={status.value}
            className={cx(
              styles["accounts__card-status"],
              styles[`accounts__card-status--${status.value}`]
            )}
            iconClassName={styles["accounts__card-status__icon"]}
          />
        </div>
        <div className={styles["accounts__card-row"]}>
          <span className={styles["accounts__card-value"]}>
            {formatNumber(value)}
          </span>
          <span className={styles["accounts__card-currency"]}>
            {currency.isoCode}
          </span>
        </div>
      </div>
    </div>
  );
}

export default withRouter(AccountCard);
