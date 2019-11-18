import React, { useEffect } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { Route, Switch } from "react-router-dom";

import { signOut } from "../../store/actions/auth";
import { getAccount } from "../../store/actions/account";
import { getCurrencies } from "../../store/actions/currencies";
import { getStatuses } from "../../store/actions/statuses";

import Header from "../../components/Header/Header";
import Home from "../../components/Home/Home";
import Accounts from "../Accounts";
import Sidebar from "../../components/Sidebar/Sidebar";
import ModalsLayout from "../../modals";

function Dashboard(props) {
  useEffect(() => {
    props.getCurrencies();
    props.getStatuses();
  }, []);

  const routes = [
    {
      path: "/dashboard",
      exact: true,
      component: Home
    },
    {
      path: "/dashboard/accounts",
      component: Accounts,
      render: routerProps => (
        <Accounts {...routerProps} handleGetAccount={props.getAccount} />
      )
    },
    {
      path: "/dashboard/budgets",
      render: props => (
        <div {...props}>
          <p>Not available. Coming soon!</p>
        </div>
      )
    },
    {
      path: "/dashboard/bills",
      render: props => (
        <div {...props}>
          <p>Not available. Coming soon!</p>
        </div>
      )
    },
    {
      path: "",
      render: props => (
        <div {...props}>
          <p>NOT FOUND</p>
        </div>
      )
    }
  ];

  return (
    <div className="d-flex d-flex-row">
      <Sidebar />
      <div className={classNames("d-flex flex-grow-1 flex-column")}>
        <Header handleSignOut={props.signOut} />
        <div className={classNames("d-flex", "p-3")}>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={route.render}
              />
            ))}
          </Switch>
        </div>
      </div>
      <ModalsLayout />
    </div>
  );
}

const mapStateTopProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  signOut,
  getAccount,
  getCurrencies,
  getStatuses
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(Dashboard);
