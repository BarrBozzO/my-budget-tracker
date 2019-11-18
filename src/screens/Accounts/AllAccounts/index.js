import React, { useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  startAccountsWatch,
  stopAccountsWatch
} from "../../../store/actions/accounts";

import { openModal } from "../../../store/actions/modal";

import StatsBar from "./AccountsStatsBar";
import ControlsBar from "./AccountsControlsBar";
import Card from "./AccountCard";

import styles from "./Accounts.module.scss";

function AllAccounts(props) {
  const {
    accounts,
    startAccountsWatch,
    stopAccountsWatch,
    openModal,
    currencies,
    statuses,
    loading
  } = props;

  const handleCreateAccount = () => {
    return openModal("accountModal", { title: "Create Account" });
  };

  const handleEditAccount = account => {
    return openModal("accountModal", {
      title: "Edit Account",
      account,
      edit: true
    });
  };

  useEffect(() => {
    startAccountsWatch();

    return stopAccountsWatch;
  }, []);

  if (loading) return "loading";

  return (
    <div className={classNames("container-fluid", styles.accounts)}>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <ControlsBar onCreate={handleCreateAccount} />
          <StatsBar
            accounts={accounts.data}
            statuses={statuses.data}
            currencies={currencies.data}
          />
        </div>
      </div>
      <div className="row">
        {accounts.data &&
          accounts.data.map(account => (
            <Card
              key={account.id}
              data={account}
              statuses={statuses.data}
              currencies={currencies.data}
              onEdit={handleEditAccount}
            />
          ))}
      </div>
    </div>
  );
}

AllAccounts.propTypes = {
  handleGetAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  accounts: state.accounts,
  currencies: state.currencies,
  statuses: state.statuses,
  loading: state.currencies.loading || state.statuses.loading
});

const mapDispatchProps = {
  startAccountsWatch,
  stopAccountsWatch,
  openModal
};

export default connect(mapStateToProps, mapDispatchProps)(AllAccounts);
