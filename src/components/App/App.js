import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import PrivateRoute from "../Common/PrivateRoute";
import Dashboard from "../Dashboard/Dashboard";
import WelcomeContainer from "../Welcome/WelcomeContainer";

function App(props) {
  const { isAuthenticated } = props.auth;
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={WelcomeContainer} />
          <PrivateRoute
            path="/dashboard"
            component={Dashboard}
            auth={isAuthenticated}
          />
          <Route component={() => <p>no page</p>} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);
