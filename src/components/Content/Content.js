import React from "react";
import { Route, Switch } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

import Header from "../Header/Header";
import Home from "../Home/Home";
import Accounts from "../Accounts/Accounts";

function Content(props) {
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
        <Accounts {...routerProps} handleGetAccount={props.handleGetAccount} />
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
    <div className={classNames("d-flex flex-grow-1 flex-column")}>
      <Header handleSignOut={props.handleSignOut} />
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
  );
}

Content.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
  handleGetAccount: PropTypes.func.isRequired
};

export default Content;
