import React from "react";

import styles from "./Accounts.module.scss";

function AccountsStatsBar({ accounts, statuses, currencies }) {
  const stats = accounts.reduce(
    (accum, current) => {
      const status = statuses.find(status => current.statusId === status.id);
      const currency = currencies.find(
        currency => current.currencyId === currency.id
      );

      if (status) {
        accum.countByStatus.total += 1;
        accum.countByStatus[status.value] =
          (accum.countByStatus[status.value] || 0) + 1;
      }

      if (currency) {
        accum.sumByCurrency[currency.isoCode] =
          (accum.sumByCurrency[currency.isoCode] || 0) + current.value;
      }

      return accum;
    },
    {
      countByStatus: {
        total: 0
      },
      sumByCurrency: {}
    }
  );

  return (
    <React.Fragment>
      <div className={styles["accounts__stats"]}>
        {[{ value: "total" }, ...statuses].map(status => (
          <div className={styles["accounts__stats-item"]} key={status.value}>
            <div className={styles["accounts__stats-item-label"]}>
              {status.value}
            </div>
            <div className={styles["accounts__stats-item-count"]}>
              {stats.countByStatus[status.value] || 0}
            </div>
          </div>
        ))}
      </div>
      <div className={styles["accounts__stats"]}>
        {currencies.map(c => (
          <div className={styles["accounts__stats-item"]} key={c.isoCode}>
            <div className={styles["accounts__stats-item-label"]}>
              {c.isoCode}
            </div>
            <div className={styles["accounts__stats-item-count"]}>
              {stats.sumByCurrency[c.isoCode] || 0}
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default AccountsStatsBar;
