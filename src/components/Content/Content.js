import React from "react";
import { Route, Switch } from "react-router-dom";
import classNames from "classnames";

import Header from "../Header/Header";
import Home from "../Home/Home";
import Accounts from "../Accounts/Accounts";

function Content() {
  const routes = [
    {
      path: "/dashboard",
      exact: true,
      component: Home
    },
    {
      path: "/dashboard/accounts",
      component: Accounts
    },
    {
      path: "/dashboard/budgets",
      component: () => <p>Not available. Coming soon!</p>
    },
    {
      path: "/dashboard/bills",
      component: () => <p>Not available. Coming soon!</p>
    },
    {
      path: "",
      component: () => <p>not found!</p>
    }
  ];

  return (
    <div className={classNames("d-flex flex-grow-1 flex-column")}>
      <Header />
      <div className={classNames("d-flex", "p-3")}>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </Switch>
      </div>
    </div>
  );
}

export default Content;
