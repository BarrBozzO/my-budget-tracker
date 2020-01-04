import React from "react";
import { Table, Button } from "react-bootstrap";
import cx from "classnames";
import moment from "moment";

import styles from "./Account.module.scss";

function AccountTransactions({ transactions, loading, onConduct }) {
  const renderContent = () => {
    if (loading) return "loading";

    if (!transactions.length) return "No Transactions";

    return (
      <div className={styles["account__transactions-content"]}>
        <Table className={styles["account__transactions-list"]} hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Sum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr>
                <td>{transaction.name}</td>
                <td>{moment(transaction.date).format("MMM DD, YYYY HH:mm")}</td>
                <td>{transaction.value}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  return (
    <div className={cx("row", styles["account__transactions"])}>
      <div className="col-sm-12">
        <div className={styles["account__transactions-header"]}>
          <span className={styles["account__transactions-header-text"]}>
            Last Transactions
          </span>
          <div className={styles["account__transactions-header-actions"]}>
            <Button onClick={onConduct}>Conduct transaction</Button>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default AccountTransactions;
