import React from "react";
import { Table } from "react-bootstrap";
import cx from "classnames";

import styles from "./Account.module.scss";

function AccountTransactions({ transactions }) {
  return (
    <div className={cx("row", styles["account__transactions"])}>
      <div className="col-sm-12">
        <div className={styles["account__transactions-header"]}>
          Last Transactions
        </div>
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
              <tr>
                <td>Transaction #1</td>
                <td>25.10.2019</td>
                <td>1239</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AccountTransactions;
