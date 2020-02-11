import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import cx from "classnames";
import Breadcrumbs from "components/Breadcrumbs";
import Tooltip from "components/Tooltip";
import Status from "components/Status";
import Icon from "components/Icon";
import Transactions from "./AccountTransactions";
import { Button } from "react-bootstrap";
import { accountStatuses as ACCOUNT_STATUSES } from "constants";
import { formatNumber } from "utils";

import { withActions } from "actions";
import { getAccount } from "store/actions/account";
import { getTransactions } from "store/actions/transactions";

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
  actions
}) {
  const accountId = match.params.id;

  useEffect(() => {
    getAccount(accountId);
    getTransactions(accountId);
  }, []);

  if (loading || accountId !== data.id) return "loading";

  const { name, description, value, statusId, currencyId } = data;
  const currency =
    currencies.find(currency => currency.id === currencyId) || {};
  const status = statuses.find(status => status.id === statusId) || {};

  const handleConductTransaction = () => {
    return actions
      .showModal("transactionModal", {
        title: "Conduct Transaction",
        accountId
      })
      .then(() => {
        getAccount(accountId);
        getTransactions(accountId);
      });
  };

  const handleEditAccount = () => {
    return actions
      .showModal("accountModal", {
        title: "Edit Account",
        edit: true,
        account: data
      })
      .then(() => {
        getAccount(accountId);
      });
  };

  return (
    <div className={cx("container-fluid", styles["account__container"])}>
      <div className="row">
        <div className={"col-sm-12"}>
          <Breadcrumbs
            path={[
              { href: "/dashboard/accounts", label: "Accounts" },
              { label: name }
            ]}
            className={styles["account__container-breadcrumbs"]}
          />
        </div>
      </div>
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
              <div className={styles["account__container-actions"]}>
                <Tooltip.Trigger
                  classNames={{
                    trigger: styles["account__tooltip-trigger"],
                    content: styles["account__tooltip-content"]
                  }}
                  render={() => (
                    <div>
                      <Button
                        className={styles["account__tooltip-button"]}
                        variant="link"
                        onClick={() => handleEditAccount()}
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                >
                  <Icon
                    name="three-dots"
                    className={styles["account__tooltip-trigger-icon"]}
                  />
                </Tooltip.Trigger>
              </div>
            </div>
            <div className={styles["account__container-row"]}>
              <span className={styles["account__container-value"]}>
                {formatNumber(value)}
              </span>
              <span className={styles["account__container-currency"]}>
                {currency.isoCode}
              </span>
            </div>
            <div classame={styles["account__container-row"]}>
              <Status
                icon={
                  (ACCOUNT_STATUSES.find(s => s.key === status.value) || {})[
                    "icon"
                  ]
                }
                label={status.value}
                className={cx(
                  styles["account__container-status"],
                  styles[`account__container-status--${status.value}`]
                )}
              />
            </div>
          </div>
        </div>
        <div className={cx("col-lg-6", "col-md-6", "col-sm-6")}>
          <div
            className={cx(
              styles["account__container-description"],
              styles["account__container-row"]
            )}
          >
            {description}
          </div>
        </div>
      </div>
      <Transactions
        accountBlocked={status.id !== "active"}
        transactions={transactions.data}
        loading={transactions.loading}
        onConduct={handleConductTransaction}
      />
    </div>
  );
}

const mapDispatchToProps = {
  getAccount,
  getTransactions
};

const mapStateToProps = state => ({
  data: state.account.data,
  transactions: state.transactions,
  currencies: state.currencies.data,
  statuses: state.statuses.data,
  loading: state.account.loading
});

export default compose(
  withActions,
  connect(mapStateToProps, mapDispatchToProps)
)(Account);
