import React from "react";
import { Route, Switch } from "react-router-dom";

import AllAccounts from "./AllAccounts";
import Account from "./Account";

function Accounts(props) {
  const { match } = props;

  return (
    <Switch>
      <Route exact path={`${match.url}/:id`} component={Account} />
      <Route component={AllAccounts} />
    </Switch>
  );
}

export default Accounts;
