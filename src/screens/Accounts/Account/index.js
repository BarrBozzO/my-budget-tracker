import React, { useEffect } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import Transactions from "./AccountTransactions";

import { getAccount } from "store/actions/account";

import styles from "./Account.module.scss";

function Account({ data, currencies, statuses, loading, match, getAccount }) {
  useEffect(() => {
    getAccount(match.params.id);
  }, []);

  if (loading) return "loading";

  const { name, description, value, statusId, currencyId } = data;
  const currency =
    currencies.find(currency => currency.id === currencyId) || {};
  const status = statuses.find(status => status.id === statusId) || {};

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
      <Transactions />
    </div>
  );
}

const mapDispatchToProps = {
  getAccount
};

const mapStateToProps = state => ({
  data: state.account.data,
  currencies: state.currencies.data,
  statuses: state.statuses.data,
  loading: state.account.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
