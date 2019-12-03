import React, { useEffect } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

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
    <div
      className={classNames("container-fluid", styles["account__container"])}
    >
      <div className={styles["account__container-title"]}>{name}</div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <div>{description}</div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
          <div>{`${value}${currency.name}`}</div>
          <div>{status.value}</div>
        </div>
      </div>
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
