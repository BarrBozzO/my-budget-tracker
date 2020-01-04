import React, { useEffect } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import Transactions from "./AccountTransactions";

import { getAccount } from "store/actions/account";
import { getTransactions } from "store/actions/transactions";
import { openModal } from "store/actions/modal";

import styles from "./Account.module.scss";

function Account({
  data,
  transactions,
  currencies,
  statuses,
  loading,
  match,
  getAccount,
  getTransactions,
  openModal
}) {
  const accountId = match.params.id;

  useEffect(() => {
    getAccount(accountId);
    getTransactions(accountId);
  }, []);

  if (loading) return "loading";

  const { name, description, value, statusId, currencyId } = data;
  const currency =
    currencies.find(currency => currency.id === currencyId) || {};
  const status = statuses.find(status => status.id === statusId) || {};

  const handleConductTransaction = () => {
    return openModal("transactionModal", {
      title: "Conduct Transaction",
      accountId
    });
  };

  return (
    <div className={cx("container-fluid", styles["account__container"])}>
      <div className="row">
        <div className={cx("col-lg-6", "col-md-6", "col-sm-6")}>
          <div className={cx(styles["account__container-card"])}>
            <div
              className={cx(
                styles["account__container-title"],
                styles["account__container-row"]
              )}
            >
              {name}
            </div>
            <div className={styles["account__container-row"]}>
              <span className={styles["account__container-value"]}>
                {value}
              </span>
              <span className={styles["account__container-currency"]}>
                {currency.isoCode}
              </span>
            </div>
            <div classame={styles["account__container-row"]}>
              <span className={styles["account__container-status"]}>
                {status.value}
              </span>
            </div>
            {false && (
              <div
                className={cx(
                  styles["account__container-description"],
                  styles["account__container-row"]
                )}
              >
                {description}
              </div>
            )}
          </div>
        </div>
      </div>
      <Transactions
        transactions={transactions.data}
        loading={transactions.loading}
        onConduct={handleConductTransaction}
      />
    </div>
  );
}

const mapDispatchToProps = {
  getAccount,
  getTransactions,
  openModal
};

const mapStateToProps = state => ({
  data: state.account.data,
  transactions: state.transactions,
  currencies: state.currencies.data,
  statuses: state.statuses.data,
  loading: state.account.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
