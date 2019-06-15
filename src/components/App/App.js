import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "../Common/PrivateRoute";
import Dashboard from "../Dashboard/Dashboard";
import WelcomeContainer from "../Welcome/WelcomeContainer";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={WelcomeContainer} />
          <PrivateRoute path="/dashboard" component={Dashboard} auth={true} />
          <Route component={() => <p>no page</p>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
