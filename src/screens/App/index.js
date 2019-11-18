import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import PrivateRoute from "../../components/Common/PrivateRoute";
import Dashboard from "../Dashboard";
import WelcomeContainer from "../../components/Welcome/WelcomeContainer";
import { LoadingBar, LoadingScreen } from "../../components/Loading";

function App(props) {
  const { isAuthenticated, loading } = props.auth;
  return (
    <div className="App">
      {loading ? (
        <LoadingScreen>
          <LoadingBar />
        </LoadingScreen>
      ) : (
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
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);
