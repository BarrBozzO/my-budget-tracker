import React from "react";

import styles from "./Accounts.module.scss";

function AccountsStatsBar({ accounts, statuses }) {
  const stats = accounts.reduce(
    (accum, current) => {
      const status = statuses.find(status => current.statusId === status.id);

      if (status) {
        accum.total += 1;
        accum[status.value] = accum[status.value] + 1 || 1;
      }

      return accum;
    },
    {
      total: 0
    }
  );
  const order = ["total", "active", "blocked", "closed"];

  return (
    <div className={styles["accounts__stats"]}>
      {order.map(status => (
        <div className={styles["accounts__stats-item"]} key={status}>
          <div className={styles["accounts__stats-item-label"]}>{status}</div>
          <div className={styles["accounts__stats-item-count"]}>
            {stats[status] || 0}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AccountsStatsBar;
